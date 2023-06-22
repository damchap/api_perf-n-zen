import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import personRoutes from './routes/person';
import roleRoutes from './routes/role';
import connectionRoutes from './routes/connect';
import statisticsRoutes from './routes/statistics';
import questionRoutes from './routes/question';
import Auth from './middlewares/Auth';
import { generateAccessToken } from './utils/secure';
import { Person } from '@prisma/client';

// Initializations
dotenv.config();
const app = express();

// Settings
app.use(express.static('public'))
app.set('port', process.env.PORT || 3000); // configuration of the port that will be used by the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
}); // start the server and listen for requests

// Middlewares (functions that are executed before they reach the routes)
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Hello World');
  })

app.post('/api/V1/RefreshToken', (req, res) => {
    const refreshToken = req.body.token
    const person = req.body.newPerson
    if (refreshToken == null) return res.sendStatus(401)
    // if there is no token return 401
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "3000", (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        // const accessToken = generateAccessToken(user)
        // res.json({ accessToken: accessToken })
        const accessToken = generateAccessToken(person)
        res.json({ accessToken: accessToken })
    })
})

// routes for persons
app.use('/api/V1/person', Auth, personRoutes);
// routes for roles
app.use('/api/V1/role', Auth, roleRoutes);
// routes for connection and authentication
app.use('/api/V1/connect', connectionRoutes);
// create new questionnaire
app.use('/api/V1/question', Auth, questionRoutes);
// routes for statistics
app.use('/api/V1/statistics', statisticsRoutes);


export default app;

  

