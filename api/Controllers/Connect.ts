import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '../utils/secure';
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
    // console.log(Mail_adress, Password);
    // get getall person
    const Persons = await prisma.person.findMany();
    // test email and password on Persons
    const newPerson = Persons.find((person) => person.Mail_adress === Mail_adress && person.Password === Password)
    // test password on newPerson
    console.log(newPerson);
    if (newPerson === undefined) {
        res.status(400).json({ message: 'Email or password incorrect' });
    } else {
        // Generate tokens
        const accessToken = generateAccessToken(newPerson);
        // Generate refresh tokens
        const refreshToken = generateRefreshToken(newPerson);
        // Send tokens in response to the client (body)
        res.json({ newPerson, accessToken, refreshToken });   
    }
}
