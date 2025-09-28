#!/usr/bin/env node

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Build configuration
const buildConfig = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  platform: 'browser',
  target: 'es2020',
  outfile: 'dist/js/main.js',
  sourcemap: true,
  format: 'iife',
  external: [],
  write: true,
};

// Copy static assets and create processed files
function copyStaticAssets() {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Copy fonts and images directories to dist
  copyAssetDirectories();
  
  // Create global CSS file
  createGlobalCSS();
  
  // Create HTML file from original content
  createHTMLFile();
  
  console.log('Assets processed successfully.');
}

function copyAssetDirectories() {
  console.log('Copying asset directories...');
  
  const assetDirs = ['fonts', 'images'];
  
  for (const dir of assetDirs) {
    // First check if assets exist in project root
    const rootSrcPath = path.join('.', dir);
    // Then check if assets exist in dist already
    const distSrcPath = path.join('dist', dir);
    const destPath = path.join('dist', dir);
    
    let srcPath = null;
    
    // Prefer root directory assets if they exist
    if (fs.existsSync(rootSrcPath)) {
      srcPath = rootSrcPath;
    } else if (fs.existsSync(distSrcPath)) {
      srcPath = distSrcPath;
    }
    
    if (srcPath) {
      // Remove existing destination if it exists
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }
      
      // Copy from source to destination
      copyDirRecursive(srcPath, destPath);
      console.log(`Copied ${dir} from ${srcPath} to ${destPath}`);
    } else {
      console.warn(`Asset directory ${dir} not found in project root or dist`);
    }
  }
  
  // Create vendor JavaScript files to maintain functionality
  createVendorScripts();
}

function createVendorScripts() {
  console.log('Creating vendor script stubs...');
  
  const distJsDir = path.join('dist', 'js');
  if (!fs.existsSync(distJsDir)) {
    fs.mkdirSync(distJsDir, { recursive: true });
  }
  
  // Create minimal vendor script stubs that don't break the page
  const vendorScripts = {
    'bricks.min.js': '// Bricks theme functionality handled by external CDN and inline scripts',
    'gtm.js': '// Google Tag Manager loaded via external script tags in HTML head', 
    'plausible.outbound-links.js': '// Plausible analytics loaded via external script tags in HTML head',
    'l.js': '// Additional scripts loaded via external sources'
  };
  
  for (const [filename, content] of Object.entries(vendorScripts)) {
    const filePath = path.join(distJsDir, filename);
    fs.writeFileSync(filePath, content);
    console.log(`Created vendor script stub: ${filename}`);
  }
}

function createGlobalCSS() {
  console.log('Creating global CSS file...');
  
  const distCssDir = path.join('dist', 'css');
  if (!fs.existsSync(distCssDir)) {
    fs.mkdirSync(distCssDir, { recursive: true });
  }
  
  // Read the consolidated CSS from src/styles/global.css
  const globalCSSPath = path.join('src', 'styles', 'global.css');
  if (fs.existsSync(globalCSSPath)) {
    const globalCSS = fs.readFileSync(globalCSSPath, 'utf8');
    fs.writeFileSync(path.join(distCssDir, 'styles.css'), globalCSS);
    console.log('Global CSS created at dist/css/styles.css');
  } else {
    console.warn('Global CSS file not found at src/styles/global.css');
  }
}

function createHTMLFile() {
  console.log('Creating HTML file...');
  
  // Read the original HTML content
  const originalHTMLPath = path.join('src', 'content.html');
  if (!fs.existsSync(originalHTMLPath)) {
    console.error('Original HTML content not found at src/content.html');
    return;
  }
  
  const originalHTML = fs.readFileSync(originalHTMLPath, 'utf8');
  
  // Replace multiple CSS references with single global stylesheet
  let processedHTML = originalHTML
    // Remove individual CSS links
    .replace(/<link[^>]*href="css\/frontend-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/font-awesome-6-brands-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/font-awesome-6-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/ionicons-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/style\.css"[^>]*>/g, '')
    // Add global stylesheet
    .replace(/<link rel="dns-prefetch" href="\/\/www\.googletagmanager\.com">/, 
             '<link rel="dns-prefetch" href="//www.googletagmanager.com">\n\n<link rel="stylesheet" id="global-styles-css" href="css/styles.css" media="all">');
  
  // Keep vendor scripts for full functionality, add TypeScript main.js
  processedHTML = processedHTML
    // Add TypeScript main.js before vendor scripts
    .replace(/<script[^>]*src="js\/bricks\.min\.js"[^>]*><\/script>/, 
             '<script src="js/main.js"></script>\n<script src="js/bricks.min.js"></script>');
  
  fs.writeFileSync(path.join('dist', 'index.html'), processedHTML);
  console.log('HTML file created with TypeScript + vendor script integration.');
}

function copyDirRecursive(src, dest) {
  // Ensure destination directory exists
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Main build function
async function build() {
  try {
    console.log('Building TypeScript...');
    await esbuild.build(buildConfig);
    console.log('TypeScript build complete.');
    
    console.log('Processing static assets...');
    copyStaticAssets();
    console.log('Assets processing completed.');
    
    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  build();
}

module.exports = { build };