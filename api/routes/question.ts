import { Router } from 'express';
import { createQuestion, deleteQuestion, getQuestionById, getQuestions, updateQuestion } from '../controllers/Question';

// generate routes for roles
const router = Router();

// routes for roles
// get all roles
router.get('/', getQuestions);
// get a role by id
router.get('/:id', getQuestionById);
// create question
router.post('/', createQuestion);
// update question
router.put('/:id', updateQuestion);
// delete question
router.delete('/:id', deleteQuestion);


// export router
export default router;