import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import ProfileForm from './pages/ProfileForm';
import PlanDisplay from './pages/PlanDisplay';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/plan" element={<PlanDisplay />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Chatbot />
        
        {/* Footer */}
        <footer className="bg-zinc-50 border-t border-zinc-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-2">
                <div className="bg-emerald-500 p-1.5 rounded-lg">
                  <div className="h-4 w-4 bg-white rounded-sm" />
                </div>
                <span className="text-lg font-bold text-zinc-900">Fitness coach</span>
              </div>
              <div className="flex space-x-8 text-sm font-medium text-zinc-500">
                <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
              </div>
              <div className="text-sm text-zinc-400">
                © 2026 Fitness coach. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
