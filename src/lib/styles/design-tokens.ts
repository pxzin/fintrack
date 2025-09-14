/**
 * Design Tokens based on FinTrack Figma Design System
 * Integrates UnoCSS with Radix Colors for consistent theming
 */

// Brand Colors (from Figma analysis)
export const brandColors = {
  primary: '#4F83FF',    // Main brand blue
  success: '#10B981',    // Completed/Success green  
  processing: '#8B5CF6', // Processing purple
  info: '#06B6D4',       // Primary label cyan
  warning: '#F59E0B',    // Warning amber
  danger: '#EF4444',     // Error red
} as const

// Background Colors (Light/Dark theme)
export const backgrounds = {
  light: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA', // Light mode background
    tertiary: '#F1F3F4',
  },
  dark: {
    primary: '#1A1F2E',   // Darkest
    secondary: '#2E3A52', // Main dark background  
    tertiary: '#3C4043',
  }
} as const

// Text Colors
export const textColors = {
  light: {
    primary: '#1A1F2E',   // Almost black
    secondary: '#5F6368', // Medium gray
    muted: '#9AA0A6',     // Light gray
    inverse: '#FFFFFF',   // White text
  },
  dark: {
    primary: '#FFFFFF',   // White
    secondary: '#E8EAED', // Light gray
    muted: '#BDC1C6',     // Medium gray
    inverse: '#1A1F2E',   // Dark text
  }
} as const

// Component Specific Colors
export const componentColors = {
  border: {
    light: '#DADCE0',
    dark: '#3C4043',
  },
  sidebar: {
    light: '#FFFFFF',
    dark: '#2E3A52',
  },
  card: {
    light: '#FFFFFF', 
    dark: '#2E3A52',
  },
  input: {
    light: '#FFFFFF',
    dark: '#3C4043',
  }
} as const

// Typography Scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: '12px',
    sm: '14px', 
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  fontWeight: {
    normal: '400',
    medium: '500', 
    semibold: '600',
    bold: '700',
  }
} as const

// Spacing System (8px grid)
export const spacing = {
  xs: '4px',   // 0.5 * 8px
  sm: '8px',   // 1 * 8px
  md: '16px',  // 2 * 8px  
  lg: '24px',  // 3 * 8px
  xl: '32px',  // 4 * 8px
  '2xl': '48px', // 6 * 8px
  '3xl': '64px', // 8 * 8px
  '4xl': '96px', // 12 * 8px
} as const

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '8px',   // Default rounded
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const

// Shadows (matching Figma design)
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  
  // Component specific
  card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.1)',
  dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const

// Layout Dimensions
export const layout = {
  sidebar: {
    width: '256px',    // 64 * 4px (16rem)
    collapsed: '64px', // 16 * 4px (4rem)
  },
  header: {
    height: '64px',    // 16 * 4px (4rem)
  },
  container: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
} as const

// Z-Index Scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
} as const

// Animation/Transition
export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const

// Export all tokens as single object
export const designTokens = {
  brandColors,
  backgrounds,
  textColors,
  componentColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  zIndex,
  animation,
} as const

// Type exports for TypeScript
export type BrandColor = keyof typeof brandColors
export type BackgroundTheme = keyof typeof backgrounds
export type TextTheme = keyof typeof textColors
export type SpacingSize = keyof typeof spacing
export type BorderRadiusSize = keyof typeof borderRadius
export type ShadowSize = keyof typeof shadows