export type Difficulty = 'easy' | 'moderate' | 'challenging';

export interface ExerciseCategory {
  id: string;
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  difficulty: Difficulty;
  durationMinutes: number;
  description: string;
  cautions: string[];
  imageUrl: string;
}

export interface ExerciseQuery {
  categoryId?: string;
  difficulty?: Difficulty;
  maxDurationMinutes?: number;
}

export type ErrorCode = 'VALIDATION_ERROR' | 'INTERNAL_ERROR';

export interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    details: Record<string, unknown> | null;
  };
}

export interface CategoriesResponse {
  categories: ExerciseCategory[];
}

export interface ExercisesResponse {
  exercises: Exercise[];
}
