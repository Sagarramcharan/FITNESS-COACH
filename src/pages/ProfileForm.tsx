import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { UserProfile, ActivityLevel, HealthGoal, DietPreference } from '../types';
import { User, Ruler, Weight, Activity, Target, Utensils, AlertCircle, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { generateFitnessPlan } from '../services/gemini';
import LoadingOverlay from '../components/LoadingOverlay';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: 'Male',
    height: 175,
    weight: 70,
    activityLevel: 'Intermediate',
    goal: 'General Fitness',
    dietPreference: 'Non-Vegetarian',
    healthConditions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const plan = await generateFitnessPlan(formData);
      localStorage.setItem('userProfile', JSON.stringify(formData));
      localStorage.setItem('fitnessPlan', JSON.stringify(plan));
      navigate('/plan');
    } catch (error) {
      console.error('Plan generation failed:', error);
      // We keep the specific error in the console for the developer, 
      // but show a generic, professional message to the user.
      alert('Service temporarily unavailable. Please check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Build Your Profile</h1>
          <p className="text-zinc-300 font-medium">Tell us about yourself so our AI can craft the perfect plan for you.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
            <span className={step >= 1 ? 'text-emerald-400' : ''}>Basics</span>
            <span className={step >= 2 ? 'text-emerald-400' : ''}>Lifestyle</span>
            <span className={step >= 3 ? 'text-emerald-400' : ''}>Health</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-zinc-300">
                    <User className="h-4 w-4 mr-2 text-emerald-400" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white placeholder-zinc-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-zinc-300">
                    <User className="h-4 w-4 mr-2 text-emerald-400" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white appearance-none"
                  >
                    <option className="bg-zinc-900">Male</option>
                    <option className="bg-zinc-900">Female</option>
                    <option className="bg-zinc-900">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-zinc-300">
                    <Ruler className="h-4 w-4 mr-2 text-emerald-400" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white placeholder-zinc-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-zinc-300">
                    <Weight className="h-4 w-4 mr-2 text-emerald-400" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white placeholder-zinc-500"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-900/20"
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-zinc-300">
                  <Activity className="h-4 w-4 mr-2 text-emerald-400" />
                  Activity Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Beginner', 'Intermediate', 'Athlete'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, activityLevel: level as ActivityLevel }))}
                      className={`px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                        formData.activityLevel === level
                          ? 'border-emerald-500 bg-emerald-500/20 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-zinc-300">
                  <Target className="h-4 w-4 mr-2 text-emerald-400" />
                  Health Goal
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white appearance-none"
                >
                  <option className="bg-zinc-900">Weight Loss</option>
                  <option className="bg-zinc-900">Muscle Gain</option>
                  <option className="bg-zinc-900">Fat Loss</option>
                  <option className="bg-zinc-900">General Fitness</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-zinc-300">
                  <Utensils className="h-4 w-4 mr-2 text-emerald-400" />
                  Diet Preference
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Vegetarian', 'Non-Vegetarian'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, dietPreference: pref as DietPreference }))}
                      className={`px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                        formData.dietPreference === pref
                          ? 'border-emerald-500 bg-emerald-500/20 text-white'
                          : 'border-white/5 bg-white/5 text-zinc-400 hover:border-white/10'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center border border-white/10"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-900/20"
                >
                  Next Step
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-zinc-300">
                  <AlertCircle className="h-4 w-4 mr-2 text-emerald-400" />
                  Health Conditions (Optional)
                </label>
                <textarea
                  name="healthConditions"
                  value={formData.healthConditions}
                  onChange={handleChange}
                  placeholder="e.g., Diabetes, Heart issues, Knee pain..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-32 resize-none text-white placeholder-zinc-500"
                />
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                <p className="text-sm text-emerald-300 leading-relaxed font-medium">
                  <strong>Almost there!</strong> Our AI is ready to analyze your profile and create a custom plan. This usually takes about 10-15 seconds.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center border border-white/10"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center disabled:opacity-50 shadow-lg shadow-emerald-900/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate My Plan'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
      <LoadingOverlay isVisible={loading} />
    </div>
  );
};

export default ProfileForm;
