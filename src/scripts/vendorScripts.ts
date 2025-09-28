// Vendor script initialization and management

export function initializeVendorScripts(): void {
  // Initialize Google Tag Manager if not already loaded
  if (typeof (window as any).gtag === 'undefined') {
    // GTM initialization is handled by the injected script tags
  }

  // Initialize Plausible analytics
  if (typeof (window as any).plausible !== 'undefined') {
    console.log('Plausible analytics initialized');
  }

  // Initialize Crisp chat
  if (typeof (window as any).$crisp !== 'undefined') {
    console.log('Crisp chat initialized');
  }

  // Initialize Bricks theme functionality (bricks.min.js is loaded externally)
  initializeBricksFramework();

  // Initialize theme toggle functionality
  initializeThemeToggle();

  // Initialize mobile menu functionality
  initializeMobileMenu();
}

function initializeBricksFramework(): void {
  // Bricks framework initialization
  // The bricks.min.js file is loaded as a script tag and provides core theme functionality
  // This function ensures any Bricks-specific behaviors are properly initialized
  
  // Initialize any Bricks-specific features that need TypeScript handling
  if (typeof (window as any).bricks !== 'undefined') {
    console.log('Bricks framework initialized');
  }
}

function initializeThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      
      // Update icon
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = newTheme === 'light' ? 'fas brxe-icon fa-sun' : 'fas brxe-icon fa-moon';
      }
      
      // Update images based on theme
      updateImagesForTheme(newTheme);
    });
  }
}

function updateImagesForTheme(theme: 'light' | 'dark'): void {
  const images = document.querySelectorAll('img[data-img-light][data-img-dark]');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    const lightSrc = imgElement.getAttribute('data-img-light');
    const darkSrc = imgElement.getAttribute('data-img-dark');
    
    if (theme === 'light' && lightSrc) {
      imgElement.src = lightSrc;
    } else if (theme === 'dark' && darkSrc) {
      imgElement.src = darkSrc;
    }
  });
}

function initializeMobileMenu(): void {
  // Mobile menu functionality is now handled by the Bricks vendor script
  // This ensures no duplication and keeps all Bricks functionality in one place
  console.log('Mobile menu functionality delegated to Bricks vendor script');
}

// Initialize submenu toggles
export function initializeSubmenus(): void {
  // Submenu functionality is now handled by the Bricks vendor script
  // This ensures no duplication and keeps all Bricks functionality in one place
  console.log('Submenu functionality delegated to Bricks vendor script');
}