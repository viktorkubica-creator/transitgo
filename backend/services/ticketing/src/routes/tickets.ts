import express from 'express';
import { z } from 'zod';
import { parseOrThrow } from '@transitgo/common/src/validation';
import { ticketRepo } from '../repos/ticketRepo';

export const ticketsRouter = express.Router();

const createSchema = z.object({ productId: z.string().min(1), userId: z.string().min(1) });
ticketsRouter.post('/tickets', (req, res) => {
  const dto = parseOrThrow(createSchema, req.body);
  const t = ticketRepo.create(dto.productId, dto.userId);
  res.status(201).json(t);
});

ticketsRouter.get('/tickets', (req, res) => {
  const userId = String(req.query.userId || '');
  if (!userId) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'userId required' } });
  res.json({ items: ticketRepo.list(userId) });
});

const actSchema = z.object({ id: z.string().min(1) });
ticketsRouter.post('/tickets/activate', (req, res) => {
  const dto = parseOrThrow(actSchema, req.body);
  try {
    ticketRepo.activate(dto.id);
    res.status(204).send();
  } catch {
    res.status(404).json({ error: { code: 'not_found', message: 'ticket not found' } });
  }
});

ticketsRouter.get('/tickets/:id/qr', (req, res) => {
  const token = ticketRepo.signQr(req.params.id);
  res.json({ token });
});

ticketsRouter.post('/tickets/validate', (req, res) => {
  const token = String((req.body && req.body.token) || '');
  if (!token) return res.status(400).json({ ok: false });
  res.json({ ok: ticketRepo.verifyQr(token) });
});
