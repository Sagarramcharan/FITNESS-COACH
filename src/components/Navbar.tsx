import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Home, User, LayoutDashboard, Info, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Get Plan', path: '/profile', icon: User },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Fitness coach
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === item.path ? 'text-emerald-600' : 'text-zinc-600'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/profile"
              className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-600 hover:text-emerald-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-600 text-white px-4 py-3 rounded-xl text-base font-medium hover:bg-emerald-700"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
