#!/usr/bin/env node
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Output directory changed from "dist" → "public"
const OUTPUT_DIR = 'public';

// Build configuration (browser bundle)
const buildConfig = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  platform: 'browser',
  target: 'es2020',
  outfile: path.join(OUTPUT_DIR, 'js', 'main.js'),
  sourcemap: true,
  format: 'iife',
  external: [],
  write: true,
};

// Build configuration (node server)
const serverBuildConfig = {
  entryPoints: ['server.ts'],
  bundle: true,
  minify: false,
  platform: 'node',
  target: 'node20',
  outfile: path.join(OUTPUT_DIR, 'server.js'),
  sourcemap: true,
  format: 'cjs',
  external: [],
  write: true,
};

// Copy static assets and create processed files
function copyStaticAssets() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Copy fonts and images directories to output
  copyAssetDirectories();

  // Create global CSS file
  createGlobalCSS();

  // Create HTML file
  createHTMLFile();

  console.log('Assets processed successfully.');
}

function copyAssetDirectories() {
  console.log('Copying asset directories...');

  const assetDirs = ['fonts', 'images'];

  for (const dir of assetDirs) {
    const rootSrcPath = path.join('.', dir);
    const outSrcPath = path.join(OUTPUT_DIR, dir);
    const destPath = path.join(OUTPUT_DIR, dir);

    let srcPath = null;

    if (fs.existsSync(rootSrcPath)) {
      srcPath = rootSrcPath;
    } else if (fs.existsSync(outSrcPath)) {
      srcPath = outSrcPath;
    }

    if (srcPath) {
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }

      copyDirRecursive(srcPath, destPath);
      console.log(`Copied ${dir} from ${srcPath} to ${destPath}`);
    } else {
      console.warn(`Asset directory ${dir} not found in project root or ${OUTPUT_DIR}`);
    }
  }

  createVendorScripts();
}

function createVendorScripts() {
  console.log('Creating vendor script stubs...');

  const jsDir = path.join(OUTPUT_DIR, 'js');
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }

  const vendorScripts = {
    'bricks.min.js': '// Bricks theme functionality handled by external CDN and inline scripts',
    'gtm.js': '// Google Tag Manager loaded via external script tags in HTML head',
    'plausible.outbound-links.js': '// Plausible analytics loaded via external script tags in HTML head',
    'l.js': '// Additional scripts loaded via external sources',
  };

  for (const [filename, content] of Object.entries(vendorScripts)) {
    const filePath = path.join(jsDir, filename);
    fs.writeFileSync(filePath, content);
    console.log(`Created vendor script stub: ${filename}`);
  }
}

function createGlobalCSS() {
  console.log('Creating global CSS file...');

  const cssDir = path.join(OUTPUT_DIR, 'css');
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }

  const globalCSSPath = path.join('src', 'styles', 'global.css');
  if (fs.existsSync(globalCSSPath)) {
    const globalCSS = fs.readFileSync(globalCSSPath, 'utf8');
    fs.writeFileSync(path.join(cssDir, 'styles.css'), globalCSS);
    console.log(`Global CSS created at ${OUTPUT_DIR}/css/styles.css`);
  } else {
    console.warn('Global CSS file not found at src/styles/global.css');
  }
}

function createHTMLFile() {
  console.log('Creating HTML file...');

  const originalHTMLPath = path.join('src', 'content.html');
  if (!fs.existsSync(originalHTMLPath)) {
    console.error('Original HTML content not found at src/content.html');
    return;
  }

  const originalHTML = fs.readFileSync(originalHTMLPath, 'utf8');

  let processedHTML = originalHTML
    .replace(/<link[^>]*href="css\/frontend-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/font-awesome-6-brands-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/font-awesome-6-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/ionicons-layer\.min\.css"[^>]*>/g, '')
    .replace(/<link[^>]*href="css\/style\.css"[^>]*>/g, '')
    .replace(
      /<link rel="dns-prefetch" href="\/\/www\.googletagmanager\.com">/,
      '<link rel="dns-prefetch" href="//www.googletagmanager.com">\n\n<link rel="stylesheet" id="global-styles-css" href="css/styles.css" media="all">'
    );

  processedHTML = processedHTML.replace(
    /<script[^>]*src="js\/bricks\.min\.js"[^>]*><\/script>/,
    '<script src="js/main.js"></script>\n<script src="js/bricks.min.js"></script>'
  );

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), processedHTML);
  console.log('HTML file created with TypeScript + vendor script integration.');
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach((entry) => {
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
    console.log('Building browser bundle...');
    await esbuild.build(buildConfig);
    console.log('Browser bundle build complete.');

    console.log('Building Node server...');
    await esbuild.build(serverBuildConfig);
    console.log('Node server build complete.');

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
