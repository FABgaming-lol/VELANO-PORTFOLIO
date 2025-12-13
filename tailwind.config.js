/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        section: "8rem",
        "section-md": "10rem",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};