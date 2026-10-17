import { afterEach, describe, expect, it } from 'vitest';
import type { Exercise, ExerciseCategory, ExerciseQuery } from '../../../packages/shared/src/index.js';
import { createApp } from '../src/app.js';
import type { ExerciseRepository } from '../src/catalog/repository.js';

const categories: ExerciseCategory[] = [{ id: 'walk', name: '저충격 유산소' }];
const exercises: Exercise[] = [{
  id: 'flat-fast-walk',
  name: '평지 빠르게 걷기',
  category: categories[0],
  difficulty: 'easy',
  durationMinutes: 20,
  description: '대화 가능한 속도로 시작',
  cautions: [],
  imageUrl: 'https://example.test/walk.jpg',
}];
const repository: ExerciseRepository = {
  listCategories: () => categories,
  listExercises: (_query: ExerciseQuery) => exercises,
  healthCheck: () => true,
  close: () => undefined,
};
let server: ReturnType<ReturnType<typeof createApp>['app']['listen']> | undefined;

afterEach(async () => {
  if (server) await new Promise<void>((resolve) => server?.close(() => resolve()));
  server = undefined;
});

async function request(path: string): Promise<Response> {
  const setup = createApp({ port: 0, databasePath: '', nodeEnv: 'test' }, repository);
  server = setup.app.listen(0);
  await new Promise<void>((resolve) => server?.once('listening', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Test server did not bind a TCP port');
  return fetch(`http://127.0.0.1:${address.port}${path}`);
}

describe('exercise catalog routes', () => {
  it('returns health and category metadata', async () => {
    const health = await request('/api/health');
    expect(health.status).toBe(200);
    expect(await health.json()).toEqual({ status: 'ok' });

    await new Promise<void>((resolve) => server?.close(() => resolve()));
    server = undefined;
    const categoryResponse = await request('/api/categories');
    expect(await categoryResponse.json()).toEqual({ categories });
  });

  it('rejects invalid catalog filters with the shared error shape', async () => {
    const response = await request('/api/exercises?maxDurationMinutes=-2');
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ error: { code: 'VALIDATION_ERROR', details: expect.any(Object) } });
  });
});
