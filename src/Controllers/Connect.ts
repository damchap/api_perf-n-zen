import e, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * function to test email and password for login
 * @param req Request
 * @param res Response
 * @route  GET /api/connect
 * @returns 
 */
export const testLogin = async (req: Request, res: Response) => {
    // get data from body
    const { Mail_adress, Password } = req.body;
    console.log(Mail_adress, Password);
    // get getall person
    const Persons = await prisma.person.findMany();
    // test email and password on Persons
    const newPerson = Persons.find((person) => person.Mail_adress === Mail_adress && person.Password === Password)
    // test password on newPerson
    // if (newPerson === null) {
        
    // } else {
    //     res.json(newPerson);
       
    // }
    res.json(newPerson);
}
