import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Activity, Flame, Heart, TrendingUp, Calendar, Target, Utensils, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [daysCount, setDaysCount] = useState(7);
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const fitnessPlan = JSON.parse(localStorage.getItem('fitnessPlan') || '{}');

  // Generate dynamic data based on daysCount
  const data = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Array.from({ length: daysCount }).map((_, i) => {
      const dayIndex = i % 7;
      const baseWeight = userProfile.weight || 70;
      return {
        name: daysCount <= 7 ? days[dayIndex] : `Day ${i + 1}`,
        calories: 2000 + Math.random() * 400,
        burned: 300 + Math.random() * 300,
        weight: baseWeight - (i * 0.05) + (Math.random() * 0.2),
        dietScore: 70 + Math.random() * 30,
        workoutScore: 60 + Math.random() * 40,
      };
    });
  }, [daysCount, userProfile.weight]);

  const stats = [
    { label: 'Avg. Daily Burn', value: `${Math.round(data.reduce((acc, curr) => acc + curr.burned, 0) / daysCount)} kcal`, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Diet Consistency', value: `${Math.round(data.reduce((acc, curr) => acc + curr.dietScore, 0) / daysCount)}%`, icon: Utensils, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Workout Completion', value: `${Math.round(data.reduce((acc, curr) => acc + curr.workoutScore, 0) / daysCount)}%`, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Weight Progress', value: `${(data[0].weight - data[data.length - 1].weight).toFixed(1)} kg`, icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Fitness Dashboard</h1>
            <p className="text-zinc-300 font-medium">Welcome back, {userProfile.gender === 'Male' ? 'Sir' : userProfile.gender === 'Female' ? 'Ma\'am' : 'Athlete'}! Tracking your progress for the last {daysCount} days.</p>
          </div>
          
          <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDaysCount(d)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  daysCount === d 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/15 transition-all"
            >
              <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Diet & Workout Performance */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Performance Overview</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" /> Diet
                </div>
                <div className="flex items-center text-xs font-bold text-blue-400 uppercase tracking-wider">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" /> Workout
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#a1a1aa', fontSize: 10}} 
                    dy={10}
                    interval={daysCount > 14 ? 4 : 0}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ 
                      backgroundColor: 'rgba(24, 24, 27, 0.9)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="dietScore" fill="#10b981" radius={[4, 4, 0, 0]} barSize={daysCount > 14 ? 10 : 20} />
                  <Bar dataKey="workoutScore" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={daysCount > 14 ? 10 : 20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weight Progress Chart */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Weight Trend</h3>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Last {daysCount} Days</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#a1a1aa', fontSize: 10}} 
                    dy={10}
                    interval={daysCount > 14 ? 4 : 0}
                  />
                  <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(24, 24, 27, 0.9)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals & Progress */}
          <div className="lg:col-span-1 bg-zinc-900/80 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <Target className="h-5 w-5 mr-2 text-emerald-400" />
              Current Goals
            </h3>
            <div className="space-y-8">
              {[
                { label: 'Weight Goal', progress: 65, target: `${(userProfile.weight || 70) - 5}kg`, current: `${userProfile.weight || 70}kg` },
                { label: 'Daily Steps', progress: 80, target: '10k', current: '8k' },
                { label: 'Water Intake', progress: 45, target: '3L', current: '1.4L' },
                { label: 'Sleep Quality', progress: 70, target: '8h', current: '6.5h' },
              ].map((goal, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-sm font-bold">{goal.label}</div>
                    <div className="text-xs text-zinc-400">{goal.current} / {goal.target}</div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400" />
                Daily Diet & Exercise Checklist
              </h3>
              <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Today</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Diet Tasks</h4>
                {[
                  'High Protein Breakfast',
                  'Pre-workout Meal',
                  'Post-workout Shake',
                  'Stay under 2200 kcal',
                  'No processed sugar',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center mr-3">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{task}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Workout Tasks</h4>
                {[
                  '45 min Strength Training',
                  '15 min Cardio Blast',
                  'Full Body Stretching',
                  '10,000 Steps achieved',
                  'Active recovery session',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mr-3">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
