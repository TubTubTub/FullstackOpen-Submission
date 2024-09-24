import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
    console.log('someone pinged here');
    response.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
});