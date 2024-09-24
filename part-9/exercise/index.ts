import express from 'express';
import { parseAPIArguments, bmiAPICalculator } from './bmiCalculatorAPI';
import { parseExerciseArgumentsAPI, calculateExercisesAPI } from './exerciseCalculatorAPI';

const app = express();
app.use(express.json());

app.get('/ping', (_request, response) => {
    response.send('pong');
});

app.get('/bmi', (request, response) => {
    const inputHeight = request.query.height;
    const inputWeight = request.query.weight;
    if (!inputHeight || !inputWeight) {
        response.status(400).json({ error: "malformatted parameters" });
    }
    try {
        const { height, weight } = parseAPIArguments([ inputHeight as string, inputWeight as string ]);
        const result = bmiAPICalculator(height, weight);
        response.status(200).send(result);

    } catch(error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
    }
});

app.post('/exercise', (request, response) => {
    console.log(request.body, 'reqeuest');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = request.body;
    if (!daily_exercises || !target ) {
        response.status(400).json({ error: 'parameters missing ' });
    }
    try {
        const { targetOutput, trainingHours } = parseExerciseArgumentsAPI(daily_exercises as string[], target as string);
        const result = calculateExercisesAPI(trainingHours, targetOutput);
        response.status(200).json(result);
    } catch(error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
    }
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});