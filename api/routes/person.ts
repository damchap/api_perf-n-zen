import { Router } from 'express';
import { getPerson, getPersonById, createPerson, updatePerson, deletePerson } from '../controllers/Person';

// generate routes for persons
const router = Router();

// routes for persons
// get all persons
router.get('/', getPerson);
// get a person by id
router.get('/:id', getPersonById);
// create a new person
router.post('/', createPerson);
// update a person
router.put('/:id', updatePerson);
// delete a person
router.delete('/:id', deletePerson);

// export router
export default router;