import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CRUD for Person prisma model

/**
 * function to get all persons
 * @param req Request 
 * @param res Response
 */
export const getPerson = async (req: Request, res: Response) => {
    // find all persons in database (prisma model) and return them in json format (res.json)
    const person = await prisma.person.findMany();
    res.json(person);
}

/**
 * function to get a person by id
 * @param req Request
 * @param res Response
 */
export const getPersonById = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // find a person in database (prisma model) with id and return it in json format (res.json)
    const person = await prisma.person.findUnique({
        where: {
            ID_person: Number(id),
        },
    });
    res.json(person);
}
/**
 * function to create a person
 * @param req Request
 * @param res Response
 */
export const createPerson = async (req: Request, res: Response) => {
    // get data from body
    const { Mail_adress, First_name, Last_name, Password, Compagny } = req.body;
    // create a new person in database (prisma model) and return it in json format (res.json)
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

/**
 * function to update a person
 * @param req Request
 * @param res Response
 */
export const updatePerson = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // get data from body
    const { Mail_adress, First_name, Last_name, Password, Compagny } = req.body;
    // update a person in database (prisma model) with id and return it in json format (res.json)
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

/**
 * function to delete a person
 * @param req Request
 * @param res Response
 */
export const deletePerson = async (req: Request, res: Response) => {
    // get id from url
    const { id } = req.params;
    // delete a person in database (prisma model) with id and return it in json format (res.json)
    const person = await prisma.person.delete({
        where: {
            ID_person: Number(id),
        },
    });
    res.json(person);
}