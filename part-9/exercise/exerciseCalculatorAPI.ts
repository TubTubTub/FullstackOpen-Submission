interface TrainingResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface parsedArguments {
    targetOutput: number;
    trainingHours: number[]
}

export const parseExerciseArgumentsAPI = (daily_exercises: string[], target: string): parsedArguments => {
    if (daily_exercises.length === 0) throw new Error('Not enough arguments');
    
    if (!isNaN(Number(target)) &&  daily_exercises.every(hour => !isNaN(Number(hour)))) {
        return {
            targetOutput: Number(target),
            trainingHours: daily_exercises.map(hour => Number(hour))
        };
    } else {
        throw new Error('malformatted parameters');
    }
};

export const calculateExercisesAPI = (trainingHours: number[], target: number): TrainingResults => {
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