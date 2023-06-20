import { Router } from 'express';
import { testLogin } from '../controllers/Connect';

// generate routes for persons
const router = Router();

// routes for persons
// get all persons
router.post('/', testLogin);

export default router;