import express from 'express';
import connectDB from './utils/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});