import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { SqliteExerciseRepository } from '../src/catalog/sqliteRepository.js';

describe('SQLite exercise catalog', () => {
  it('opens the catalog read-only and filters by category and duration', () => {
    const databasePath = path.resolve('src/db/exercises.sqlite');
    const repository = new SqliteExerciseRepository(databasePath);
    try {
      expect(repository.listCategories()).toHaveLength(9);
      expect(repository.listExercises({ categoryId: 'low-impact-cardio', maxDurationMinutes: 20 })).toMatchObject([
        { id: 'flat-fast-walk', durationMinutes: 20 },
      ]);
      expect(repository.healthCheck()).toBe(true);
    } finally {
      repository.close();
    }
  });

  it('serves catalog records over HTTP without profile input', async () => {
    const repository = new SqliteExerciseRepository(path.resolve('src/db/exercises.sqlite'));
    const { app, close } = createApp({ port: 0, databasePath: '', nodeEnv: 'test' }, repository);
    const server = app.listen(0);
    try {
      await new Promise<void>((resolve) => server.once('listening', resolve));
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Test server did not bind a TCP port');
      const response = await fetch(`http://127.0.0.1:${address.port}/api/exercises?maxDurationMinutes=20`);
      expect(response.status).toBe(200);
      expect(await response.json()).toMatchObject({
        exercises: expect.arrayContaining([
          expect.objectContaining({ id: 'flat-fast-walk', durationMinutes: 20 }),
        ]),
      });
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      close();
    }
  });
});
