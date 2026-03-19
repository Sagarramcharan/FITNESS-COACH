import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Global Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920")',
        }}
        aria-hidden="true"
      />
      {/* Global Dark Overlay */}
      <div className="fixed inset-0 bg-black/70 z-10" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-emerald-400 uppercase bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/30 rounded-full">
                AI-Powered Personal Training
              </span>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-8">
                Your Personal <span className="text-emerald-400">AI Health</span> <br className="hidden sm:block" />
                & Fitness Coach
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-200 mb-10 leading-relaxed">
                Get personalized workout routines and nutrition plans tailored to your body, goals, and lifestyle. Powered by advanced AI to help you achieve your best self.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-900/40 flex items-center justify-center group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 z-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Fitness coach?</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">We combine cutting-edge artificial intelligence with sports science to deliver results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Plans',
                desc: 'No generic templates. Every plan is generated specifically for your body type and goals.',
                icon: Zap,
                color: 'bg-amber-500/20 text-amber-400',
              },
              {
                title: 'Nutrition Focused',
                desc: 'Diet plans featuring simple Indian household foods that are easy to prepare and delicious.',
                icon: Heart,
                color: 'bg-rose-500/20 text-rose-400',
              },
              {
                title: 'Progress Tracking',
                desc: 'Visual dashboards to monitor your weekly progress and celebrate every milestone.',
                icon: CheckCircle2,
                color: 'bg-emerald-500/20 text-emerald-400',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-sm border border-white/10"
              >
                <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="relative py-20 z-20 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '10k+' },
              { label: 'Plans Generated', value: '50k+' },
              { label: 'Success Rate', value: '94%' },
              { label: 'AI Accuracy', value: '99.9%' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-emerald-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
