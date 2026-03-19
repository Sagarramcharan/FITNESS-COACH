import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Globe, Award, Mail, Github, Twitter, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-extrabold text-zinc-900 mb-6"
        >
          Revolutionizing <span className="text-emerald-600">Fitness</span> <br />
          with Artificial Intelligence
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg text-zinc-600 leading-relaxed">
          Fitness coach was born from a simple idea: everyone deserves a world-class personal trainer and nutritionist, regardless of their budget or location.
        </p>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
            alt="Fitness Training"
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-3xl shadow-xl hidden sm:block">
            <div className="text-4xl font-bold mb-1">100%</div>
            <div className="text-sm font-medium opacity-80">Personalized AI Logic</div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-zinc-900">Our Mission</h2>
          <p className="text-zinc-600 leading-relaxed">
            We leverage the latest advancements in Large Language Models to analyze complex health data and provide actionable, safe, and effective fitness and nutrition advice. Our goal is to make healthy living accessible, sustainable, and enjoyable for everyone.
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Science-backed recommendations' },
              { icon: Users, text: 'Community-driven growth' },
              { icon: Globe, text: 'Global accessibility' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="bg-emerald-50 p-2 rounded-lg">
                  <item.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="font-semibold text-zinc-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team / Values */}
      <div className="bg-zinc-50 rounded-[3rem] p-12 sm:p-20 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Core Values</h2>
          <p className="text-zinc-600">The principles that guide our AI and our team.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: 'Integrity',
              desc: 'We prioritize health over hype. Our AI is trained to provide safe and sustainable advice.',
              icon: Award,
            },
            {
              title: 'Innovation',
              desc: 'We are constantly updating our models with the latest research in sports science and nutrition.',
              icon: Zap,
            },
            {
              title: 'Inclusivity',
              desc: 'Fitness is for every body. Our plans adapt to all ages, genders, and health conditions.',
              icon: Heart,
            },
          ].map((value, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                <value.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{value.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">Get in Touch</h2>
        <div className="flex justify-center space-x-6">
          <a href="#" className="p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm">
            <Mail className="h-6 w-6 text-zinc-600" />
          </a>
          <a href="#" className="p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm">
            <Github className="h-6 w-6 text-zinc-600" />
          </a>
          <a href="#" className="p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm">
            <Twitter className="h-6 w-6 text-zinc-600" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
