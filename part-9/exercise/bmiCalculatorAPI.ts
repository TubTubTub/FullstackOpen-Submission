interface BMIValues {
    height: number;
    weight: number;
}

export interface BMIAPIResult {
    height: number;
    weight: number;
    bmi: string;
}

export const parseAPIArguments = (args: string[]): BMIValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if ( !isNaN(Number(args[0])) && !isNaN(Number(args[1])) ) {
        return {
            height: Number(args[0]),
            weight: Number(args[1])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const bmiAPICalculator = (height: number, weight: number): BMIAPIResult => {
    const bmi = weight / (height / 100) ** 2;

    let resultString;
    
    if (bmi < 18.5) resultString = 'Underweight';
    else if (bmi < 25) resultString = 'Normal range';
    else if (bmi < 30) resultString = 'Overweight';
    else if (bmi < 40) resultString = 'Obese';
    else resultString = 'fatso';

    return {
        height,
        weight,
        bmi: resultString
    };
};