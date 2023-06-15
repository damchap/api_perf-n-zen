import { Router } from 'express';
import { getStatistics } from '../Controllers/Statistics';

// generate routes for statistics
const router = Router();

// routes for statistics
// get all statistics by id
router.get('/questionnaire/:id', getStatistics);


export default router;