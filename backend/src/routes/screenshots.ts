import { Router } from 'express';

const router = Router();

// Get all screenshots
router.get('/', async (_req, res) => {
  res.json({ 
    ok: true, 
    data: [],
    message: 'Screenshots endpoint - Phase 1 implementation pending'
  });
});

// Create new screenshot
router.post('/', async (_req, res) => {
  res.json({ 
    ok: true, 
    data: { id: 'stub-id-' + Date.now() },
    message: 'Screenshot creation - Phase 1 implementation pending'
  });
});

// Get screenshot by ID
router.get('/:id', async (req, res) => {
  res.json({ 
    ok: true, 
    data: { id: req.params.id },
    message: 'Screenshot retrieval - Phase 1 implementation pending'
  });
});

// Process OCR for screenshot
router.post('/:id/ocr', async (req, res) => {
  res.json({ 
    ok: true, 
    data: { 
      id: req.params.id,
      queued: true,
      message: 'OCR processing queued - Phase 1 implementation pending'
    }
  });
});

// Add tags to screenshot
router.post('/:id/tags', async (req, res) => {
  res.json({ 
    ok: true, 
    data: { 
      screenshotId: req.params.id,
      attached: true,
      message: 'Tags attached - Phase 1 implementation pending'
    }
  });
});

// Remove tag from screenshot
router.delete('/:id/tags/:tagId', async (req, res) => {
  res.json({ 
    ok: true, 
    data: { 
      screenshotId: req.params.id,
      tagId: req.params.tagId,
      removed: true,
      message: 'Tag removed - Phase 1 implementation pending'
    }
  });
});

export default router;
