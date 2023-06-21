import { Router } from 'express';
import { getRole, getRoleById, createRole, updateRole, deleteRole } from '../controllers/Role';

// generate routes for roles
const router = Router();

// routes for roles
// get all roles
router.get('/', getRole);
// get a role by id
router.get('/:id', getRoleById);
// create a new role
router.post('/', createRole);
// update a role
router.put('/:id', updateRole);
// delete a role
router.delete('/:id', deleteRole);

// export router
export default router;