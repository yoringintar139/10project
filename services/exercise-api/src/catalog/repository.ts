import type { Exercise, ExerciseCategory, ExerciseQuery } from '../../../../packages/shared/src/index.js';

export interface ExerciseRepository {
  listCategories(): ExerciseCategory[];
  listExercises(query: ExerciseQuery): Exercise[];
  healthCheck(): boolean;
  close(): void;
}
