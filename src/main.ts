// RareSkills Website - TypeScript Entry Point
// Provides TypeScript functionality for the website

/// <reference path="./types/vendor.d.ts" />

import { initializeVendorScripts } from './scripts/vendorScripts';

class RareSkillsWebsite {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeScripts();
      });
    } else {
      this.initializeScripts();
    }
  }

  private initializeScripts(): void {
    // Initialize all vendor scripts and custom functionality
    initializeVendorScripts();
    
    // Initialize any custom TypeScript functionality
    this.initializeCustomFeatures();
  }

  private initializeCustomFeatures(): void {
    // Add any custom TypeScript functionality here
    console.log('RareSkills website TypeScript features initialized');
  }
}

// Initialize the website when this module loads
new RareSkillsWebsite();