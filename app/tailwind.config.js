/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        brutal: {
          red: "#ff3333",
          yellow: "#ffff00",
          blue: "#0066ff",
          green: "#00ff9d",
          bg: "#0A0A0A",
          "bg-human": "#F5F0E8",
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        serif: ['DM Serif Display', 'serif'],
        heading: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '0px',
        xl: '0px',
        lg: '0px',
        md: '0px',
        sm: '0px',
        xs: '0px',
        DEFAULT: '0px',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #000000',
        'brutal-red': '4px 4px 0px 0px #ff3333',
        'brutal-blue': '4px 4px 0px 0px #0066ff',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-sm-red': '2px 2px 0px 0px #ff3333',
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
