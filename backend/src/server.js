import express from 'express'
import dotenv from 'dotenv'
import workoutsRoutes from './routes/workoutsRoutes.js'
import { connectDB } from './config/db.js';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


//middleware
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());


app.use('/api/workouts', workoutsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}.`)
    })
});

