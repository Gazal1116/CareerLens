import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">CareerLens</h1>
          <p className="text-xl text-gray-300">AI-Powered Career Insights</p>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://vite.dev" target="_blank" className="transform hover:scale-110 transition-transform duration-300">
            <img src={viteLogo} className="h-24 brightness-110 hover:brightness-150" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transform hover:scale-110 transition-transform duration-300">
            <img src={reactLogo} className="h-24 brightness-110 hover:brightness-150" alt="React logo" />
          </a>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-8 border border-purple-500/50">
          <h2 className="text-3xl font-bold text-white mb-6">Interactive Counter</h2>
          
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl mb-6 transition-all duration-200 transform hover:scale-105"
          >
            Count: <span className="text-2xl">{count}</span>
          </button>
          
          <p className="text-gray-300 mb-4">
            Edit <code className="bg-gray-950 px-2 py-1 rounded text-blue-400">src/App.jsx</code> and save to test HMR
          </p>
          
          <p className="text-sm text-gray-400 pt-4 border-t border-gray-700">
            ✨ Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
