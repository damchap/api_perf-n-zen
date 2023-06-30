import { Router } from 'express';
import { getRole, getRoleById, createRole, updateRole, deleteRole, getRoleByIdPerson } from '../controllers/Role';

// generate routes for roles
const router = Router();

// routes for roles
// get all roles
router.get('/', getRole);
// get a role by id
router.get('/:id', getRoleById);
// get a role by id person
router.get('/person/:id', getRoleByIdPerson);
// create a new role
router.post('/', createRole);
// update a role
router.put('/:id', updateRole);
// delete a role
router.delete('/:id', deleteRole);

// export router
export default router;