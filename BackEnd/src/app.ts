import express from 'express';
import morgan from 'morgan';
import connectDB from './utils/db';
import router from './user/router';
import passport from './utils/googlePassport';
import setupSwagger from './utils/swagger';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(passport.initialize());

setupSwagger(app);

app.use('/api/user', router);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});