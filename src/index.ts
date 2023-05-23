import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
import personRoutes from './routes/person';
import roleRoutes from './routes/role';
import Auth from './Middlewares/Auth';


// Initializations
const app = express();

// Settings

app.set('port', process.env.PORT || 3000); // configuration of the port that will be used by the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
}); // start the server and listen for requests

// Middlewares (functions that are executed before they reach the routes)
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// User and password for authentication jwt
const user = {
    username: 'admin',
    password: 'admin'
};
// Generate tokens for authentication jwt
function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
// Generate refresh tokens for authentication jwt
function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "4000", { expiresIn: '1y' });
}
// Routes (URLs that the server will listen to)
// route for authentication jwt and generate tokens (access and refresh)
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Validate user and password
    if (username !== user.username || password !== user.password) {
        return res.status(401).send('Username or password incorrect');
    }
    // Generate tokens
    const accessToken = generateAccessToken(user);
    // Generate refresh tokens
    const refreshToken = generateRefreshToken(user);
    // Send tokens in response to the client (body)
    res.json({ accessToken, refreshToken });
});

// routes for persons
app.use('/api/V1/person', Auth, personRoutes);
// routes for roles
app.use('/api/V1/role', Auth, roleRoutes);


  

