// Type declarations for vendor JavaScript libraries

// Crisp Chat Widget
declare global {
  interface Window {
    $crisp?: any;
    CRISP_WEBSITE_ID?: string;
    CRISP_RUNTIME_CONFIG?: any;
    __CRISP_INCLUDED?: boolean;
    __CRISP_INSTANCE?: any;
  }
}

// Plausible Analytics
declare global {
  interface Window {
    plausible?: (eventName: string, options?: {
      callback?: (response: { status?: number; error?: any }) => void;
      props?: Record<string, any>;
      meta?: Record<string, any>;
      interactive?: boolean;
    }) => void;
  }
}

// Google Tag Manager / Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    google_tag_manager?: any;
    ga?: (...args: any[]) => void;
  }
}

// Bricks Theme Framework
declare global {
  interface Window {
    bricksData?: any;
    bricksQueryLoopInstances?: any;
    bricksFrontend?: any;
    bricksSettings?: any;
  }
}

export {};