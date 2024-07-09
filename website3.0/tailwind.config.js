/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**.{js,ts,jsx,tsx,mdx}",
    "./pages/**/**.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    fontFamily: {
        arial: ['Arial', 'sans-serif'],
        cursive: ['cursive'],
        rancho: ['"Rancho"', 'cursive'],
        poppins: ['"Poppins"','sans-serif'],
    },
    extend: {
      screens: {
        sm: '320px',  // Adjust the 'sm' breakpoint to 320px
        md: '768px',  // Default value for 'md'
        lg: '1024px', // Default value for 'lg'
        xl: '1280px', // Default value for 'xl'
        '2xl': '1536px', // Default value for '2xl'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        '500': '500',
      }
    },
  },
  plugins: [],
};
