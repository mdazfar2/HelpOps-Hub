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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'lightloader-gradient':"linear-gradient(180deg, #ffffff 8.1%, #bbbbbb 100%)",
          'darkloader-gradient': 'linear-gradient(180deg, #333 8.1%, #121212 100%)',
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
