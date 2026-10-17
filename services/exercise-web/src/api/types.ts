import type { Exercise, ExerciseCategory, ExerciseQuery } from '@fitmotion/shared';

export interface ApiClient {
  getCategories(): Promise<ExerciseCategory[]>;
  listExercises(query?: ExerciseQuery): Promise<Exercise[]>;
}
