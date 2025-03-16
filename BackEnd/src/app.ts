import express from 'express';
import connectDB from './utils/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import setupSwagger from './utils/swagger';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});