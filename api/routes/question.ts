import { Router } from 'express';


// generate routes for roles
const router = Router();

// routes for roles
// get all roles
router.get('/', (req, res) => {
    res.send('Hello World');
    })

// export router
export default router;