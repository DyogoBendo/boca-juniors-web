import { Exercise } from "./Exercise";
import { ExerciseGroup } from "./ExerciseGroup";

export interface ExerciseGroupWithExercises extends ExerciseGroup {
    exerciseList: Exercise[]  
  }