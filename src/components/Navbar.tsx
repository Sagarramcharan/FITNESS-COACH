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

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Start Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-600 hover:text-emerald-600 p-2 transition-colors rounded-lg hover:bg-zinc-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-zinc-200 shadow-xl z-40"
          >
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                      location.pathname === item.path
                        ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-emerald-600'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      location.pathname === item.path ? 'bg-emerald-100' : 'bg-zinc-100'
                    }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold block">{item.name}</span>
                      <span className="text-sm text-zinc-500">Go to {item.name.toLowerCase()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
