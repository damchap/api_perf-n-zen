import e, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * function get questions
 * @param req Request
 * @param res Response
 */
export const getQuestions = async (req: Request, res: Response) => {
    const questions = await prisma.question.findMany();
    if (questions.length === 0) {
        res.status(400).json({
            message: `Il n'y a pas de question`,
        });
    } else {
        res.status(200).json(questions);
    }
}

/**
 * function get question by ID
 * @param req Request
 * @param res Response
 */
export const getQuestionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
        where: {
            ID_question: Number(id),
        },
    });
    if (question) {
        res.status(200).json(question);
    } else {
        res.status(400).json({
            message: `La question n'existe pas`,
        });
    }
}

/**
 * function create question
 * @param req Request
 * @param res Response
 */
export const createQuestion = async (req: Request, res: Response) => {
    const { Question, ID_theme } = req.body;
    // test if the question already exists
    const question = await prisma.question.findMany({
        where: {
            Title_question: Question,
        },
    });
    if (question.length > 0) {
        return res.status(400).json({
            message: `La question ${Question} existe déjà`,
        });
    } else {
        // create the question
        const newQuestion = await prisma.question.create({
            data: {
                Title_question: Question,
                ID_theme: ID_theme,
            },
        });
        if (newQuestion) {
            return res.status(201).json({
                message: `La question ${Question} a été créée`,
            });
        } else {
            return res.status(400).json({
                message: `La question ${Question} n'a pas été créée`,
            });
        }
    }
}

/**
 * function update question
 * @param req Request
 * @param res Response
 */
export const updateQuestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Question, ID_theme } = req.body;
    const question = await prisma.question.update({
        where: {
            ID_question: Number(id),
        },
        data: {
            Title_question: Question,
            ID_theme: ID_theme,
        },
    });
    if (question) {
        return res.status(202).json({
            message: `La question a été modifiée`,
        });
    } else {
        return res.status(400).json({
            message: `La question n'existe pas`,
        });
    }
}

/**
 * function delete question
 * @param req Request
 * @param res Response
 */
export const deleteQuestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const question = await prisma.question.delete({
        where: {
            ID_question: Number(id),
        },
    });
    if (question) {
        return res.status(202).json({
            message: `La question a été supprimée`,
        });
    }
    return res.status(400).json({
        message: `La question n'existe pas`,
    });

}

/**
 * function get questions by ID_theme
 * @param req Request
 * @param res Response
 */
export const getQuestionsByTheme = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const questions = await prisma.question.findMany({
        where: {
            ID_theme: idNumber,
        },
    });
    if (questions.length === 0) {
        return res.status(400).json({
            message: `Le theme ${idNumber} n'existe pas`
        });
    } else {
        res.status(200).json(questions);
    }
}