/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color palette
        'sunset-orange': '#FF6B35',
        'warm-peach': '#FF8C42',
        'golden-yellow': '#FFB84D',
        'soft-cream': '#FFF3E0',
        'warm-white': '#FFFBF5',
        'coral-pink': '#FF9B85',
        'terracotta': '#D84315',
        'warm-brown': '#6D4C41',
        'light-sand': '#F5E6D3',
        'warm-gray': '#8D6E63',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFB84D 0%, #FF8C42 50%, #FF6B35 100%)',
        'sunset-gradient': 'linear-gradient(to bottom, #FF6B35 0%, #FFB84D 50%, #FFFBF5 100%)',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(255, 107, 53, 0.15)',
        'warm-lg': '0 10px 40px rgba(255, 107, 53, 0.2)',
      },
    },
  },
  plugins: [],
}