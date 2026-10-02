import express from 'express';
import { catalogRepo, ordersRepo, refundsRepo } from '../repos/catalogRepo';
import { z } from 'zod';
import { parseOrThrow } from '@transitgo/common/src/validation';

export const productsRouter = express.Router();

productsRouter.get('/products', (_req, res) => {
  res.json({ items: catalogRepo.list() });
});

const orderSchema = z.object({ productId: z.string().min(1), amount: z.number().min(1), currency: z.literal('EUR') });
productsRouter.post('/orders', (req, res) => {
  const dto = parseOrThrow(orderSchema, req.body);
  const o = ordersRepo.create(dto.productId, dto.amount, dto.currency);
  res.status(201).json(o);
});

productsRouter.get('/orders', (_req, res) => {
  res.json({ items: ordersRepo.list() });
});

const refundSchema = z.object({ orderId: z.string().min(1), amount: z.number().min(1) });
productsRouter.post('/refunds', (req, res) => {
  const dto = parseOrThrow(refundSchema, req.body);
  const r = refundsRepo.create(dto.orderId, dto.amount);
  res.status(201).json(r);
});

productsRouter.get('/refunds', (_req, res) => {
  res.json({ items: refundsRepo.list() });
});
