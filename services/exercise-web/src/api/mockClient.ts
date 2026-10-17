import type { Exercise, ExerciseQuery } from '@fitmotion/shared';
import { categories, exercises } from '../mocks/data';
import { beforeMockResponse, getPreviewState } from './previewState';
import type { ApiClient } from './types';

export const mockClient: ApiClient = {
  async getCategories() {
    await beforeMockResponse();
    return getPreviewState() === 'empty' ? [] : categories;
  },
  async listExercises(query: ExerciseQuery = {}) {
    await beforeMockResponse();
    if (getPreviewState() === 'empty') return [];
    return exercises.filter((item) =>
      (!query.categoryId || item.category.id === query.categoryId)
      && (!query.difficulty || item.difficulty === query.difficulty)
      && (query.maxDurationMinutes === undefined || item.durationMinutes <= query.maxDurationMinutes),
    );
  },
};
