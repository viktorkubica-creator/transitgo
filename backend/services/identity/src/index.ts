import express from 'express';
import { authRouter } from './routes/auth';
import { accountRouter } from './routes/account';
import { requestIdMiddleware, errorHandler } from '@transitgo/common';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', authRouter);
app.use('/v1', accountRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3003;
  app.listen(port, () => {
    // Implements FR-020 (TRGO-14)
    console.log(`Identity service listening on :${port}`);
  });
}

app.use(errorHandler);
export default app;
