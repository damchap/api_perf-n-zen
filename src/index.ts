import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import personRoutes from './routes/person';

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

// Routes
app.use('/api/person', personRoutes);



