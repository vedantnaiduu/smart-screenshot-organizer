import { Router } from 'express';

const router = Router();

// Get all tags
router.get('/', async (_req, res) => {
  res.json({ 
    ok: true, 
    data: [],
    message: 'Tags endpoint - Phase 1 implementation pending'
  });
});

// Create new tag
router.post('/', async (_req, res) => {
  res.json({ 
    ok: true, 
    data: { 
      id: 'tag-stub-' + Date.now(),
      name: 'Sample Tag',
      color: '#3B82F6'
    },
    message: 'Tag creation - Phase 1 implementation pending'
  });
});

export default router;
