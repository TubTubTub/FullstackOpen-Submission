interface TrainingResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface parsedArguments {
    target: number;
    trainingHours: number[]
}

const parseExerciseArguments = (args: string[]): parsedArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const trainingHours = args.slice(3);
    if (!isNaN(Number(args[2])) && trainingHours.every(hour => !isNaN(Number(hour)))) {
        return {
            target: Number(args[2]),
            trainingHours: trainingHours.map(hour => Number(hour))
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateExercises = (trainingHours: number[], target: number): TrainingResults => {
    if (trainingHours.length === 0) throw new Error('No arguments provided');
    const periodLength = trainingHours.length;
    const trainingDays = trainingHours.filter(hours => hours !== 0).length;
    const sumOfHours = trainingHours.reduce((prev, cur) => prev + cur);
    const average = sumOfHours / periodLength;
    const success = average >= target;

    const rating = Math.floor((average / target) * 3);
    let ratingDescription;
    if (rating < 1.5) {
        ratingDescription = 'pretty bad';
    } else if (rating < 3) {
        ratingDescription = 'not bad but could be better';
    } else {
        ratingDescription = 'very good';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const { target, trainingHours } = parseExerciseArguments(process.argv);
    const result = calculateExercises(trainingHours, target);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}