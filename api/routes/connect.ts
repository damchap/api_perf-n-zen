import { Router } from 'express';
import { testLogin } from '../Controllers/Connect';

// generate routes for persons
const router = Router();

// routes for persons
// get all persons
router.post('/', testLogin);

export default router;