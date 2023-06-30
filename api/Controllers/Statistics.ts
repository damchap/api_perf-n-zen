import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * function get statistics by ID_questionnaire 
 * @param req Request
 * @param res Response
 */
export const getStatistics = async (req: Request, res: Response) => {
    const { ID_person, ID_questionnaire } = req.body;

    const idNumber = Number(ID_questionnaire);
    // test si l'utilisateur a le droit de voir les statistiques
    const owner = await prisma.owner.findMany({
        where: {
            ID_person: Number(ID_person),
        },
    });
    const role = await prisma.role.findUnique({
        where: {
            ID_role: owner[0].ID_role,
        },
    });
    if (role?.Role_name === 'admin') {
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
    } else if (role?.Role_name === 'user') {
        return res.status(400).json({
            msg: `L'utilisateur ${ID_person} n'a pas le droit de voir les statistiques`
        });
    }
}