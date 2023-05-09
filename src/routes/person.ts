import { Router } from 'express';
import { getPerson, getPersonById, createPerson, updatePerson, deletePerson } from '../Controllers/Person';

const router = Router();

router.get('/', getPerson);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;