export interface Exercise {
  id: string;
  name: string;
  duration?: {
    [key: string]: number;
  };
  reps?: {
    [key: string]: number;
  };
}

export interface Workout {
  id: string;
  name: string;
  date?: string;
  exercises: Exercise[];
}
