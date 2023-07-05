import { Router } from 'express';
import { createTheme, deleteTheme, getTheme, getThemeById, updateTheme } from '../controllers/Theme';

// generate routes for statistics
const router = Router();

// routes for themes
// get all themes
router.get('/', getTheme);
// get a theme by id
router.get('/:id', getThemeById);
// create a new theme
router.post('/', createTheme);
// update a theme
router.put('/:id', updateTheme);
// delete a theme
router.delete('/:id', deleteTheme);



export default router;