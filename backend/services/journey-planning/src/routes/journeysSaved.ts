import express from 'express';
import { z } from 'zod';
import { parseOrThrow } from '@transitgo/common/src/validation';
import { favouritesRepo, journeysRepo } from '../repos/journeysRepo';

export const savedRouter = express.Router();

const saveSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1)
});

// POST /v1/journeys/saved
savedRouter.post('/journeys/saved', (req, res) => {
  const dto = parseOrThrow(saveSchema, req.body);
  const j = journeysRepo.save(dto.origin, dto.destination);
  res.status(201).json(j);
});

// GET /v1/journeys/saved
savedRouter.get('/journeys/saved', (_req, res) => {
  res.json({ items: journeysRepo.list() });
});

// POST /v1/favourites
const favSchema = z.object({
  type: z.enum(['stop', 'line']),
  value: z.string().min(1)
});
savedRouter.post('/favourites', (req, res) => {
  const dto = parseOrThrow(favSchema, req.body);
  const f = favouritesRepo.add(dto.type, dto.value);
  res.status(201).json(f);
});

// GET /v1/favourites
savedRouter.get('/favourites', (_req, res) => {
  res.json({ items: favouritesRepo.list() });
});
