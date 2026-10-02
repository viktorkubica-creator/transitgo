import express from 'express';
import { authRouter } from './routes/auth';
import { accountRouter } from './routes/account';
import { requestIdMiddleware } from '@transitgo/common/src/requestId';
import { errorHandler } from '@transitgo/common/src/errors';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', authRouter);
app.use('/v1', accountRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

const port = process.env.PORT || 3003;
app.listen(port, () => {
  // Implements FR-020 (TRGO-14)
  console.log(`Identity service listening on :${port}`);
});

app.use(errorHandler);
export default app;
