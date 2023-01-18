export interface Exercise {
  id: string;
  name: string;
  sets: {
    [key: string]: {
      type: "rep" | "time";
      value: number;
    };
  };
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: string;
  workouts: string;
  date: string;
}