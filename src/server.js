import cors from 'cors';
import express from 'express';
import estimatorRouter from './routes/estimator';


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/on-covid-19', estimatorRouter);


app.listen(PORT);
