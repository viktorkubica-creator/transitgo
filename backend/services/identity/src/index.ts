import express from 'express';
import { authRouter } from './routes/auth';

const app = express();
app.use(express.json());
app.use('/v1', authRouter);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  // Implements FR-020 (TRGO-14)
  console.log(`Identity service listening on :${port}`);
});

export default app;
