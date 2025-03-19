import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import connectDB from './utils/db';
import router from './user/router';
import cors from 'cors';
import passport from './utils/googlePassport';
import setupSwagger from './utils/swagger';
import expressSession from 'express-session';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true, 
}));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(passport.initialize());

setupSwagger(app);

app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', router);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});