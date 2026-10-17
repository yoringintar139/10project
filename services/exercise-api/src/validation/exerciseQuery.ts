import { z } from 'zod';

export const exerciseQuerySchema = z.object({
  categoryId: z.string().trim().min(1).optional(),
  difficulty: z.enum(['easy', 'moderate', 'challenging']).optional(),
  maxDurationMinutes: z.coerce.number().int().min(1).max(300).optional(),
}).strict();
