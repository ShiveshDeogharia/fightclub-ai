import express from 'express';
import { createMatchup, getAllMatchups } from '../controllers/matchupController.js';

const router = express.Router();

router.post('/', createMatchup);
router.get('/', getAllMatchups);

export default router;
