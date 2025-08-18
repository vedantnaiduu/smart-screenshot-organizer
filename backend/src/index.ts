import express from 'express';
import cors from 'cors';
import screenshots from './routes/screenshots.js';
import tags from './routes/tags.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Health check
app.get('/health', (_req, res) => 
  res.json({ ok: true, service: 'backend', timestamp: new Date().toISOString() })
);

// API routes
app.use('/api/screenshots', screenshots);
app.use('/api/tags', tags);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Backend server listening on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
});
