import { Router } from 'express';
import { getRole,createRole, updateRole, getRoleById, deleteRole } from '../Controllers/Role';

const router = Router();

router.get('/', getRole);
router.get('/:id', getRoleById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;