import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * function get statistics by ID_questionnaire
 * @param req Request
 * @param res Response
 */
export const getStatistics = async (req: Request, res: Response) => {
    const { id } = req.params;

    const idNumber = Number(id);
    const questions = await prisma.reply.findMany({
        select: {
            ID_question: true,
            ID_person: true,
            ID_questionnaire: true,
            Note: true,
        },
        where: {
            ID_questionnaire: idNumber,
        },
    });
    if (questions.length === 0) {
        return res.status(400).json({
            msg: `Le questionnaire ${idNumber} n'existe pas`
        });
    } else {
        res.status(200).json(questions);
    }
}