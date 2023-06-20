import { Router } from 'express';
import { getQuestionById, getQuestions } from '../controllers/Question';

// generate routes for roles
const router = Router();

// routes for roles
// get all roles
router.get('/', getQuestions);
// get a role by id
router.get('/:id', getQuestionById);
// create question
router.post('/', getQuestions);
// update question
router.put('/:id', getQuestions);
// delete question
router.delete('/:id', getQuestions);


// export router
export default router;