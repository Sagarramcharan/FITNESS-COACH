export type ActivityLevel = 'Beginner' | 'Intermediate' | 'Athlete';
export type HealthGoal = 'Weight Loss' | 'Muscle Gain' | 'Fat Loss' | 'General Fitness';
export type DietPreference = 'Vegetarian' | 'Non-Vegetarian';

export interface UserProfile {
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  dietPreference: DietPreference;
  healthConditions: string;
}

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  reps?: string;
  sets?: string;
  description: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
  totalDuration: string;
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  name: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietDay {
  day: string;
  meals: Meal[];
  totalCalories: number;
}

export interface FitnessPlan {
  weeklyWorkouts: WorkoutDay[];
  dietPlan: DietDay[];
  recommendations: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
