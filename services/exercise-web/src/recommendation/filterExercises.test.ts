import { describe, expect, it } from 'vitest';
import { exercises } from '../mocks/data';
import { initialProfile } from '../state/profile';
import { filterExercises } from './filterExercises';

describe('filterExercises', () => {
  it('respects duration, selected difficulty, and knee cautions', () => {
    const result = filterExercises(exercises, initialProfile);
    expect(result.map((exercise) => exercise.id)).toEqual([
      'flat-fast-walk', 'indoor-cycle', 'snow-walk', 'beach-frisbee',
      'beginner-badminton', 'table-tennis', 'soccer-passing',
    ]);
  });

  it('prioritizes the selected category when the profile permits it', () => {
    const result = filterExercises(exercises, { ...initialProfile, difficulty: 'moderate', kneeDiscomfort: false });
    expect(result[0].id).toBe('shadow-boxing');
    expect(result.some((exercise) => exercise.id === 'beginner-swim')).toBe(false);
  });
});
