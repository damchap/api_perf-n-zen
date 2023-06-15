import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * function get questions
 * @param req Request
 * @param res Response
 */
export const getQuestions = async (req: Request, res: Response) => {
    const questions = await prisma.question.findMany();
    res.json(questions);
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
    res.json(question);
}

/**
 * function create question
 * @param req Request
 * @param res Response
 */
export const createQuestion = async (req: Request, res: Response) => {
    const { Question, ID_theme } = req.body;
    const newQuestion = await prisma.question.create({
        data: {
            Title_question: Question,
            ID_theme: ID_theme,
        },
    });
    res.json(newQuestion);
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
    res.json(question);
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
    res.json(question);
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
            msg: `Le theme ${idNumber} n'existe pas`
        });
    } else {
        res.status(200).json(questions);
    }
}