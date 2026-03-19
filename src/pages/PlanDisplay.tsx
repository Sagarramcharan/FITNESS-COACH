import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FitnessPlan, UserProfile } from '../types';
import { Dumbbell, Utensils, Calendar, Clock, RefreshCw, ChevronRight, ChevronLeft, Flame, Info, Zap } from 'lucide-react';
import { generateFitnessPlan } from '../services/gemini';
import LoadingOverlay from '../components/LoadingOverlay';

const PlanDisplay = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'workout' | 'diet'>('workout');
  const [activeDay, setActiveDay] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitnessPlan');
    const savedProfile = localStorage.getItem('userProfile');
    if (savedPlan && savedProfile) {
      setPlan(JSON.parse(savedPlan));
      setProfile(JSON.parse(savedProfile));
    } else {
      navigate('/profile');
    }
  }, [navigate]);

  const handleRegenerate = async () => {
    if (!profile) return;
    setIsRegenerating(true);
    try {
      const newPlan = await generateFitnessPlan(profile);
      setPlan(newPlan);
      localStorage.setItem('fitnessPlan', JSON.stringify(newPlan));
    } catch (error) {
      console.error('Regeneration error:', error);
      alert('Failed to regenerate plan.');
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!plan) return null;

  const currentWorkout = plan.weeklyWorkouts[activeDay];
  const currentDiet = plan.dietPlan[activeDay];

  return (
    <div 
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" 
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Your Personalized Plan</h1>
            <p className="text-zinc-300 font-medium">Customized for {profile?.goal} • {profile?.activityLevel} Level</p>
          </div>
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border-2 border-white/20 px-6 py-3 rounded-2xl font-bold text-white hover:bg-white/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Plan'}</span>
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-4">
          {plan.weeklyWorkouts.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all ${
                activeDay === idx
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-white/10 text-zinc-300 border border-white/10 hover:border-white/20 backdrop-blur-md'
              }`}
            >
              Day {idx + 1}
            </button>
          ))}
        </div>

        {/* Tab Selector */}
        <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-2xl mb-10 w-full sm:w-fit border border-white/10">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'workout' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Dumbbell className="h-5 w-5" />
            <span>Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'diet' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Utensils className="h-5 w-5" />
            <span>Diet Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {activeTab === 'workout' ? (
              <motion.div
                key={`workout-${activeDay}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{currentWorkout.focus}</h2>
                    <div className="flex items-center text-zinc-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-bold">{currentWorkout.totalDuration}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                      <h3 className="font-bold text-emerald-400 mb-3 flex items-center">
                        <Zap className="h-4 w-4 mr-2" /> Warm-up
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentWorkout.warmup.map((item, i) => (
                          <li key={i} className="text-emerald-300 text-sm flex items-center font-medium">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-white mb-4">Exercises</h3>
                      {currentWorkout.exercises.map((ex) => (
                        <div key={ex.id} className="group bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{ex.name}</h4>
                            <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
                              {ex.sets ? `${ex.sets} sets` : ex.duration}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed mb-2">{ex.description}</p>
                          {ex.reps && <span className="text-xs font-bold text-emerald-400">{ex.reps} reps</span>}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h3 className="font-bold text-zinc-300 mb-3 flex items-center">
                        <Zap className="h-4 w-4 mr-2" /> Cool-down
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentWorkout.cooldown.map((item, i) => (
                          <li key={i} className="text-zinc-400 text-sm flex items-center font-medium">
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`diet-${activeDay}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Nutrition Plan</h2>
                    <div className="flex items-center text-rose-400 bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-500/20">
                      <Flame className="h-4 w-4 mr-2" />
                      <span className="text-sm font-bold">{currentDiet.totalCalories} kcal</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentDiet.meals.map((meal) => (
                      <div key={meal.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md mb-1 inline-block">
                              {meal.type}
                            </span>
                            <h4 className="font-bold text-white text-lg">{meal.name}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-white">{meal.calories} kcal</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meal.ingredients.map((ing, i) => (
                            <span key={i} className="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-zinc-300">
                              {ing}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase">Protein</div>
                            <div className="font-bold text-white">{meal.protein}g</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase">Carbs</div>
                            <div className="font-bold text-white">{meal.carbs}g</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-zinc-500 uppercase">Fats</div>
                            <div className="font-bold text-white">{meal.fats}g</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900/80 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Info className="h-5 w-5 mr-2 text-emerald-400" />
                Coach's Advice
              </h3>
              <ul className="space-y-4">
                {plan.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-zinc-400 leading-relaxed flex items-start font-medium">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 mt-1.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-600/80 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group border border-white/10">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-emerald-100 text-sm mb-6 font-medium">Log your daily activities to see visual insights in your dashboard.</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center shadow-lg"
                >
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay isVisible={isRegenerating} />
    </div>
  );
};

export default PlanDisplay;
