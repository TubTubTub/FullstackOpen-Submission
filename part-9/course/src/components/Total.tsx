interface TotalProps {
    totalExercises: number;
}

const Total = ({ totalExercises }: TotalProps): JSX.Element => {
    return <p>Number of exercises {totalExercises}</p>;
};

export default Total;