import path from 'node:path';

export interface AppConfig {
  port: number;
  databasePath: string;
  nodeEnv: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return {
    port,
    databasePath: path.resolve(env.EXERCISE_DB_PATH ?? 'src/db/exercises.sqlite'),
    nodeEnv: env.NODE_ENV ?? 'development',
  };
}
