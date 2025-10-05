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

  // Initialize theme toggle functionality
  initializeThemeToggle();

  // Initialize mobile menu functionality
  initializeMobileMenu();
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
  const mobileToggle = document.querySelector('.bricks-mobile-menu-toggle');
  const mobileMenu = document.querySelector('.bricks-mobile-menu-wrapper');
  const overlay = document.querySelector('.bricks-mobile-menu-overlay');
  
  if (mobileToggle && mobileMenu && overlay) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      
      mobileToggle.setAttribute('aria-expanded', (!isExpanded).toString());
      mobileMenu.classList.toggle('active', !isExpanded);
      overlay.classList.toggle('active', !isExpanded);
      document.body.classList.toggle('mobile-menu-open', !isExpanded);
    });
    
    overlay.addEventListener('click', () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    });
  }
}

// Initialize submenu toggles
export function initializeSubmenus(): void {
  const submenuToggles = document.querySelectorAll('.brx-submenu-toggle button');
  
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const submenu = toggle.parentElement?.querySelector('.sub-menu');
      
      toggle.setAttribute('aria-expanded', (!isExpanded).toString());
      if (submenu) {
        submenu.classList.toggle('show', !isExpanded);
      }
    });
  });
}