import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CRUD for Theme prisma model

/**
 * function to get all themes
 * @param req Request
 * @param res Response
 */
export const getTheme = async (req: Request, res: Response) => {
    // find all themes in database (prisma model) and return them in json format (res.json)
    const themes = await prisma.theme.findMany();
    if (themes.length > 0) {
        res.status(200).json(themes);
    } else {
        res.status(404).json({
            message: "Aucun thème n'a été trouvé",
        });
    }
}

/**
 * function to get a theme by id
 * @param req Request
 * @param res Response
 */
export const getThemeById = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // find a theme in database (prisma model) with id and return it in json format (res.json)
    const theme = await prisma.theme.findUnique({
        where: {
            ID_theme: Number(id),
        },
    });
    if (theme) {
        res.status(200).json(theme);
    } else {
        res.status(404).json({
            message: "Aucun thème n'a été trouvé",
        });
    }
}
/**
 * function to create a theme
 * @param req Request
 * @param res Response
 */
export const createTheme = async (req: Request, res: Response) => {
    // get data from body
    const { Theme_name } = req.body;
    // create a new theme in database (prisma model) and return it in json format (res.json)
    const newTheme = await prisma.theme.create({
        data: {
            Theme_name,
        },
    });
    if (newTheme) {
        res.status(201).json({
            message: "Le thème a bien été créé",
        });
    } else {
        res.status(400).json({
            message: "Le thème n'a pas pu être créé",
        });
    }
}

/**
 * function to update a theme
 * @param req Request
 * @param res Response
 */
export const updateTheme = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // get data from body
    const { Theme_name } = req.body;
    // update a theme in database (prisma model) and return it in json format (res.json)
    const updateTheme = await prisma.theme.update({
        where: {
            ID_theme: Number(id),
        },
        data: {
            Theme_name
        },
    });
    if (updateTheme) {
        res.status(202).json({
            message: "Le thème a bien été modifié",
        });
    } else {
        res.status(400).json({
            message: "Le thème n'a pas pu être modifié",
        });
    }
}

/**
 * function to delete a theme
 * @param req Request
 * @param res Response
 */
export const deleteTheme = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // delete a theme in database (prisma model) and return it in json format (res.json)
    // test if the theme already exists
    const theme = await prisma.theme.findUnique({
        where: {
            ID_theme: Number(id),
        },
    });
    if (!theme) {
        return res.status(400).json({
            message: `Le thème n'existe pas`,
        });
    } else {
        const deleteTheme = await prisma.theme.delete({
            where: {
                ID_theme: Number(id),
            },
        });
        res.status(202).json({
            message: "Le thème a bien été supprimé",
        });
    }
}

