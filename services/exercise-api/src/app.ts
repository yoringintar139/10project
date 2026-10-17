import cors from 'cors';
import express from 'express';
import { pinoHttp } from 'pino-http';
import type { ExerciseRepository } from './catalog/repository.js';
import { SqliteExerciseRepository } from './catalog/sqliteRepository.js';
import type { AppConfig } from './config.js';
import { errorHandler } from './errors/errorHandler.js';
import { exerciseQuerySchema } from './validation/exerciseQuery.js';

export function createApp(config: AppConfig, repository?: ExerciseRepository) {
  const app = express();
  const catalog = repository ?? new SqliteExerciseRepository(config.databasePath);

  app.disable('x-powered-by');
  app.use(cors());
  app.use(express.json({ limit: '16kb' }));
  app.use(pinoHttp({ redact: ['req.headers.authorization', 'req.headers.cookie'] }));

  app.get('/api/health', (_request, response) => {
    try {
      response.status(catalog.healthCheck() ? 200 : 503).json({ status: 'ok' });
    } catch {
      response.status(503).json({ status: 'unavailable' });
    }
  });

  app.get('/api/categories', (_request, response, next) => {
    try {
      response.status(200).json({ categories: catalog.listCategories() });
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/exercises', (request, response, next) => {
    try {
      const query = exerciseQuerySchema.parse(request.query);
      response.status(200).json({ exercises: catalog.listExercises(query) });
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);
  return { app, close: () => catalog.close() };
}
