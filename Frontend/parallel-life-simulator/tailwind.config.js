/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Premium Dark Palette
        'app-bg': '#0B1120',      // Deepest background
        'card-bg': '#151E32',     // Slightly lighter for cards
        'nav-bg': '#0F172A',      // Navbar background
        
        // Accents
        'primary-blue': '#2563eb', // Electric Blue (Primary Action)
        'accent-blue': '#3b82f6',  // Lighter blue for hovers/highlights
        'primary-green': '#10b981', // Success/Growth
        'primary-purple': '#8b5cf6', // Innovation/Alternate
        
        // Text
        'text-primary': '#F8FAFC',   // White/Off-white
        'text-secondary': '#94A3B8', // Muted Blue-Gray
        
        // Status
        'success': '#22c55e',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(37, 99, 235, 0.2)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
