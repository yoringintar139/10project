import type { Exercise } from '@fitmotion/shared';
import type { ExerciseProfile } from '../state/profile';

const difficultyRank: Record<Exercise['difficulty'], number> = {
  easy: 0,
  moderate: 1,
  challenging: 2,
};

export function filterExercises(exercises: Exercise[], profile: ExerciseProfile): Exercise[] {
  return exercises
    .filter((exercise) => exercise.durationMinutes <= profile.availableMinutes)
    .filter((exercise) => difficultyRank[exercise.difficulty] <= difficultyRank[profile.difficulty])
    .filter((exercise) => !profile.kneeDiscomfort || !exercise.cautions.some((caution) => caution.includes('무릎')))
    .sort((first, second) =>
      Number(second.category.id === profile.categoryId) - Number(first.category.id === profile.categoryId),
    );
}
