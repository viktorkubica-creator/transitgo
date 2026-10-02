import express from 'express';
import { z } from 'zod';
import { parseOrThrow } from '@transitgo/common';
import { alertsRepo } from '../repos/alertsRepo';

export const alertsRouter = express.Router();

// GET /v1/alerts
alertsRouter.get('/alerts', (_req, res) => {
  res.json({ items: alertsRepo.list() });
});

const schema = z.object({
  line: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  startsAt: z.string().min(1),
  endsAt: z.string().optional()
});

// POST /v1/alerts (mock)
alertsRouter.post('/alerts', (req, res) => {
  const dto = parseOrThrow(schema, req.body) as z.infer<typeof schema>;
  const created = alertsRepo.add(dto);
  res.status(201).json(created);
});
