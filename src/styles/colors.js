// // // // export const colors = {
// // // //   primary: '#6C5CE7',
// // // //   secondary: '#A29BFE',
// // // //   success: '#00B894',
// // // //   danger: '#FF7675',
// // // //   warning: '#FDCB6E',
// // // //   dark: '#2D3436',
// // // //   light: '#DFE6E9',
// // // //   white: '#FFFFFF',
// // // //   gray: '#B2BEC3',
// // // //   background: '#F8F9FA',
// // // //   cardBg: '#FFFFFF',
// // // //   text: '#2D3436',
// // // //   textLight: '#636E72',
// // // //   border: '#DFE6E9',
// // // // };
// // // export const colors = {
// // //   primary: '#3B82F6',        // Bright Blue
// // //   secondary: '#60A5FA',      // Light Blue
// // //   success: '#10B981',        // Green
// // //   danger: '#EF4444',         // Red
// // //   warning: '#F59E0B',        // Orange
// // //   dark: '#0F172A',           // Very Dark Blue (main background)
// // //   darkCard: '#1E293B',       // Dark card background
// // //   darkLight: '#334155',      // Lighter dark for borders
// // //   light: '#94A3B8',          // Gray for inactive elements
// // //   white: '#FFFFFF',          // Pure white
// // //   gray: '#64748B',           // Medium gray
// // //   background: '#0F172A',     // Dark background
// // //   cardBg: '#1E293B',         // Card background
// // //   text: '#F1F5F9',           // Light text
// // //   textLight: '#94A3B8',      // Secondary text
// // //   border: '#334155',         // Border color
// // //   accent: '#3B82F6',         // Accent blue
// // // };
// // export const colors = {
// //   // Main colors - Modern Dark Theme
// //   primary: '#3B82F6',        // Clean Blue
// //   secondary: '#8B5CF6',      // Purple accent
// //   success: '#10B981',        // Green
// //   danger: '#EF4444',         // Red
// //   warning: '#F59E0B',        // Amber
  
// //   // Background colors
// //   background: '#0A0E27',     // Deep dark blue (main bg)
// //   cardBg: '#151936',         // Card background (slightly lighter)
  
// //   // Neutral colors
// //   dark: '#0A0E27',           // Darkest
// //   darkCard: '#151936',       // Card surface
// //   darkLight: '#1E2542',      // Borders, dividers
  
// //   // Text colors
// //   text: '#E2E8F0',           // Primary text (almost white)
// //   textLight: '#94A3B8',      // Secondary text
// //   textMuted: '#64748B',      // Tertiary text
  
// //   // UI elements
// //   white: '#FFFFFF',
// //   border: '#1E2542',
// //   light: '#475569',
// //   gray: '#64748B',
  
// //   // Accent
// //   accent: '#3B82F6',
// //   accentLight: '#60A5FA',
// // };
// export const colors = {
//   // Primary colors
//   primary: '#3B82F6',        // Bright Blue
//   secondary: '#8B5CF6',      // Purple
//   success: '#10B981',        // Emerald Green
//   danger: '#EF4444',         // Red
//   warning: '#F59E0B',        // Amber
  
//   // Backgrounds
//   background: '#0F172A',     // Slate 900 (very dark blue)
//   cardBg: '#1E293B',         // Slate 800 (card surface)
  
//   // Surfaces
//   dark: '#0F172A',
//   darkCard: '#1E293B',
//   darkLight: '#334155',      // Slate 700
  
//   // Text
//   text: '#F1F5F9',           // Slate 100 (almost white)
//   textLight: '#94A3B8',      // Slate 400
//   textMuted: '#64748B',      // Slate 500
  
//   // UI
//   white: '#FFFFFF',
//   border: '#334155',
//   light: '#475569',
//   gray: '#64748B',
  
//   // Accents
//   accent: '#3B82F6',
//   accentLight: '#60A5FA',
// };
// Choose your theme: 'midnight' or 'ocean'
const THEME = 'midnight';  // Change this to 'ocean' to switch

const themes = {
  midnight: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    background: '#0F172A',
    cardBg: '#1E293B',
    dark: '#0F172A',
    darkCard: '#1E293B',
    darkLight: '#334155',
    text: '#F1F5F9',
    textLight: '#94A3B8',
    textMuted: '#64748B',
    white: '#FFFFFF',
    border: '#334155',
    light: '#475569',
    gray: '#64748B',
    accent: '#3B82F6',
    accentLight: '#60A5FA',
  },
  ocean: {
    primary: '#06B6D4',
    secondary: '#8B5CF6',
    success: '#14B8A6',
    danger: '#F43F5E',
    warning: '#FBBF24',
    background: '#020617',
    cardBg: '#0F172A',
    dark: '#020617',
    darkCard: '#0F172A',
    darkLight: '#1E293B',
    text: '#F8FAFC',
    textLight: '#CBD5E1',
    textMuted: '#94A3B8',
    white: '#FFFFFF',
    border: '#1E293B',
    light: '#64748B',
    gray: '#94A3B8',
    accent: '#06B6D4',
    accentLight: '#22D3EE',
  },
};

export const colors = themes[THEME];
