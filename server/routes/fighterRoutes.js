import express from 'express';
import { createFighter, getAllFighters } from '../controllers/fighterController.js';

const router = express.Router();

router.post('/', createFighter);
router.get('/', getAllFighters);

export default router;
