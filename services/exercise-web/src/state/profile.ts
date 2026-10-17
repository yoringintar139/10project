import type { Difficulty } from '@fitmotion/shared';

export interface ExerciseProfile {
  weightKg: number;
  heightCm: number;
  age: number;
  experience: 'beginner' | 'intermediate' | 'advanced';
  categoryId: string;
  difficulty: Difficulty;
  availableMinutes: number;
  kneeDiscomfort: boolean;
}

export const initialProfile: ExerciseProfile = {
  weightKg: 68,
  heightCm: 170,
  age: 28,
  experience: 'beginner',
  categoryId: 'combat',
  difficulty: 'easy',
  availableMinutes: 20,
  kneeDiscomfort: true,
};
