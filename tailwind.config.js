/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // אם את עובדת בתיקיית `app`
    "./pages/**/*.{js,ts,jsx,tsx}", // אם את עובדת בתיקיית `pages`
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
