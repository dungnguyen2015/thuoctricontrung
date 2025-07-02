module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-green-700 text-white shadow-md flex items-center justify-between px-4 py-3 md:px-8',
    'text-xl md:text-2xl font-bold md:hidden relative h-64 w-full',
    'hidden md:flex items-center space-x-6 hover:underline min-h-screen bg-white text-gray-800 bg-white text-black',
    'py-12 px-6 bg-gray-50 text-2xl font-bold text-center mb-6',
    'max-w-3xl', 
    'mx-auto',
    'list-disc max-w-4xl', 
    'list-inside py-1 px-3', 
    'text-gray-700 mb-8 absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded', 
    'text-lg m-1 ml-2 my-2 bg-blue-600 text-white px-4 py-1 rounded w-3/6',
    'py-12 transition-colors duration-200 bg-red-100 text-red-800 border-red-400 bg-green-100 text-green-800 border-green-400', 
    'grid grid-cols-1  border-t border p-2 table-auto overflow-x-auto text-right px-3 bg-gray-100 min-w-full w-5/6 w-1/6 max-w-md mr-2 text-blue-600 text-black sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-600 mb-10',
    'bg-red-50 py-16 px-4 md:px-10 lg:px-24 p-6 border rounded-xl shadow hover:shadow-lg transition',
    
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}