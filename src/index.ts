import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Auth from './middlewares/auth';
dotenv.config();
import personRoutes from './routes/person';
import roleRoutes from './routes/role';


// Initializations
const app = express();

// Settings

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const user = {
    username: 'admin',
    password: 'admin'
};

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "4000", { expiresIn: '1y' });
}

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username !== user.username || password !== user.password) {
        return res.status(401).send('Username or password incorrect');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
});

app.get('/api/me', Auth, (req, res) => {
    res.send(user);
});

app.use('/api/V1/person', Auth, personRoutes);
app.use('/api/V1/role', Auth, roleRoutes);


  

