import { DatabaseSync } from 'node:sqlite';
import type { Exercise, ExerciseCategory, ExerciseQuery } from '../../../../packages/shared/src/index.js';
import type { ExerciseRepository } from './repository.js';

interface ExerciseRow {
  id: string;
  name: string;
  category_id: string;
  category_name: string;
  difficulty: Exercise['difficulty'];
  duration_minutes: number;
  description: string;
  cautions_json: string;
  image_url: string;
}

export class SqliteExerciseRepository implements ExerciseRepository {
  private readonly database: DatabaseSync;

  constructor(databasePath: string) {
    this.database = new DatabaseSync(databasePath, { readOnly: true });
    this.database.exec('PRAGMA query_only = ON');
  }

  listCategories(): ExerciseCategory[] {
    return this.database.prepare(
      'SELECT id, name FROM categories ORDER BY name',
    ).all() as unknown as ExerciseCategory[];
  }

  listExercises(query: ExerciseQuery): Exercise[] {
    const filters: string[] = [];
    const values: (string | number)[] = [];

    if (query.categoryId) {
      filters.push('e.category_id = ?');
      values.push(query.categoryId);
    }
    if (query.difficulty) {
      filters.push('e.difficulty = ?');
      values.push(query.difficulty);
    }
    if (query.maxDurationMinutes !== undefined) {
      filters.push('e.duration_minutes <= ?');
      values.push(query.maxDurationMinutes);
    }

    const where = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const rows = this.database.prepare(`
      SELECT e.id, e.name, c.id AS category_id, c.name AS category_name,
        e.difficulty, e.duration_minutes, e.description, e.cautions_json, e.image_url
      FROM exercises e
      INNER JOIN categories c ON c.id = e.category_id
      ${where}
      ORDER BY e.name
    `).all(...values) as unknown as ExerciseRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: { id: row.category_id, name: row.category_name },
      difficulty: row.difficulty,
      durationMinutes: row.duration_minutes,
      description: row.description,
      cautions: JSON.parse(row.cautions_json) as string[],
      imageUrl: row.image_url,
    }));
  }

  healthCheck(): boolean {
    return this.database.prepare('SELECT 1').get() !== undefined;
  }

  close(): void {
    this.database.close();
  }
}
