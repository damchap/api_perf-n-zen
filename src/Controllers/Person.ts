// expres CRUD for Person prisma model
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPerson = async (req: Request, res: Response) => {
    const person = await prisma.person.findMany();
    res.json(person);
}

export const getPersonById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const person = await prisma.person.findUnique({
        where: {
            ID_person: Number(id),
        },
    });
    res.json(person);
}

export const createPerson = async (req: Request, res: Response) => {
    const { Mail_adress, First_name, Last_name, Password, Compagny } = req.body;
    const newPerson = await prisma.person.create({
        data: {
            Mail_adress,
            First_name,
            Last_name,
            Password,
            Compagny
        },
    });
    res.json(newPerson);
}

export const updatePerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Mail_adress, First_name, Last_name, Password, Compagny } = req.body;
    const person = await prisma.person.update({
        where: {
            ID_person: Number(id),
        },
        data: {
            Mail_adress,
            First_name,
            Last_name,
            Password,
            Compagny
        },
    });
    res.json(person);
}

export const deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const person = await prisma.person.delete({
        where: {
            ID_person: Number(id),
        },
    });
    res.json(person);
}