import express from 'express';
import { paymentsRouter } from './routes/payments';
import { requestIdMiddleware, errorHandler } from '@transitgo/common';
import { productsRouter } from './routes/products';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', paymentsRouter);
app.use('/v1', productsRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3004;
  app.listen(port, () => {
    // Implements FR-022..FR-024 (TRGO-16)
    console.log(`Payments service listening on :${port}`);
  });
}

app.use(errorHandler);
export default app;
