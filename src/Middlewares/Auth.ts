import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// create auth 
const Auth = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // if there is no token return 401
    if (token == null) return res.sendStatus(401)

    // verify token with secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "3000", (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default Auth;