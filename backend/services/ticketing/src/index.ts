import express from 'express';
import { requestIdMiddleware, errorHandler } from '@transitgo/common';
import { ticketsRouter } from './routes/tickets';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', ticketsRouter);
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3005;
  app.listen(port, () => {
    // Implements FR-013..FR-015
    console.log(`Ticketing service listening on :${port}`);
  });
}

app.use(errorHandler);
export default app;
