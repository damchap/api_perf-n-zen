import { Router } from 'express';
import { getStatistics } from '../controllers/Statistics';

// generate routes for statistics
const router = Router();

// routes for statistics
// get all statistics by id
router.post('/questionnaire/', getStatistics);


export default router;