import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { join } from 'path';
import estimatorRouter from './routes/estimator';


const PORT = process.env.PORT || 3000;
const logFile = join(__dirname, '../requests.log');
const logStream = createWriteStream(logFile, { flags: 'a' });
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method\t\t:url\t\t:status\t\t:response-time[0] ms', {
  stream: logStream
}));
app.use('/api/v1/on-covid-19', estimatorRouter);


app.listen(PORT);
