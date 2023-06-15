import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import personRoutes from './routes/person';
import roleRoutes from './routes/role';
import connectionRoutes from './routes/connect';
import statisticsRoutes from './routes/statistics';
import questionRoutes from './routes/question';

import Auth from './Middlewares/Auth';
import path from 'path';


// Initializations
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
// routes for persons
app.use('/api/V1/person', Auth, personRoutes);
// routes for roles
app.use('/api/V1/role', Auth, roleRoutes);
// routes for connection and authentication
app.use('/api/V1/connect', connectionRoutes);
// create new questionnaire
app.use('/api/V1/questionnaire', Auth, questionRoutes);
// routes for statistics
app.use('/api/V1/statistics', statisticsRoutes);


export default app;

  

