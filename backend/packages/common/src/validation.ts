import { ZodSchema } from 'zod';
import { ApiProblem } from './errors';

export function parseOrThrow<T>(schema: ZodSchema<T>, input: unknown): T {
  const res = schema.safeParse(input);
  if (!res.success) {
    throw new ApiProblem('VALIDATION_ERROR', 'Invalid input', 400, res.error.flatten());
  }
  return res.data;
}
