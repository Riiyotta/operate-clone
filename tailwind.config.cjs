/** @type {import('tailwindcss').Config} */
// Tokens from CLONE_SPEC.md §0. The original uses Tailwind v4; px values from its
// v4 spacing classes are written as arbitrary values in components.
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // v4 wraps `hover:` in @media (hover: hover); match that on touch devices.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    // Full list (not extend) so the order is ascending and `max-*` variants work.
    screens: {
      sm: '640px',
      md: '768px', // 48rem
      lg: '1024px', // 64rem
      xl: '1280px', // 80rem
      'home-you-wide': '1440px', // custom @media (min-width: 90rem)
      '2xl': '1536px', // 96rem
    },
    extend: {
      colors: {
        waitlist: {
          'deep-green': '#005C00', // page bg
          'dark-green': '#117025', // ink, rules, caps, primary button
          'light-green': '#85C093', // canvas dots, ticket card, video-card frame
          paper: '#EBEBEB', // main/footer sheet, binder rails
          gray: '#E0E0E0', // primary button text/border, body bg
          feedback: '#C8E3CE', // sign-up status text (color-mix #85C093 + 55% white) — CLONE_SPEC_PAGES §3.4
        },
        copper: '#B85725', // sign-up invalid rows — CLONE_SPEC_PAGES §3.5
        manifesto: '#94BA9D', // "Software doesn't close deals" panel
        'video-card': '#77AA83', // footer card + lightbox media bg
        'nav-sheet': '#DCDCDC',
        strip: '#FAFAFA', // nav inner strip (used at /60, /70)
        'pill-gray': '#D9D9D9', // demo chapter pills / tooltip
        'hole-hatch': '#9D989B', // folded-corner diamond hatch
        bubble: '#F6F6F6', // hero integration bubbles 2..6
        stone: { 800: '#29211E' },
        // Demo (light theme) grays — §0 table; also used by the demo frame wrapper.
        gray: {
          50: '#FFFFFF',
          75: '#FCFCFC',
          100: '#F7F7F7',
          200: '#EDEFEF',
          300: '#E0E5E5',
          400: '#CAD3D2',
          500: '#9BA8A7',
          600: '#71807E',
          700: '#5F6D6B',
          800: '#294D47',
          900: '#09352E',
        },
        'demo-accent': '#008125',
        'demo-accent-from': '#269600',
        brand: '#006F19', // ::selection background
      },
      fontFamily: {
        denim: ['var(--font-denim)'],
        cinetype: ['var(--font-cinetype)'],
        muoto: ['var(--font-muoto)'],
        'geist-mono': ['var(--font-geist-mono)'],
        courier: ['"Courier New"', 'monospace'],
      },
      fontWeight: {
        book: '450',
      },
      borderColor: {
        // Tailwind v4 preflight defaults borders to currentColor
        DEFAULT: 'currentColor',
      },
      transitionProperty: {
        // v4 `transition-colors` list (includes outline-color) — spec §4
        colors: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0, 0, .2, 1)',
        'in-out': 'cubic-bezier(.4, 0, .2, 1)',
        'out-quint': 'cubic-bezier(.23, 1, .32, 1)',
        'out-cubic': 'cubic-bezier(.33, 1, .68, 1)',
        'out-quad': 'cubic-bezier(.25, .46, .45, .94)',
        'in-out-cubic': 'cubic-bezier(.65, 0, .35, 1)',
        'in-out-quart': 'cubic-bezier(.77, 0, .175, 1)',
      },
    },
  },
  plugins: [],
}
