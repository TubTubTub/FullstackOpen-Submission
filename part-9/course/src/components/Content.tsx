interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    name: string;
    exerciseCount: number;
    description: string;
    }

interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
    courseParts: CoursePart[]
}

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps): JSX.Element => {
    const checkPart = (part: CoursePart): JSX.Element => {
        switch (part.kind) {
            case "basic":
                return <i>{part.description}</i>;
            case "group":
                return <p>project exercises {part.groupProjectCount}</p>;
            case "background":
                return (
                    <div>
                        <i>{part.description}</i>
                        <p>submit to {part.backgroundMaterial}</p>
                    </div>
                );
            case "special":
                return (
                    <div>
                        <i>{part.description}</i>
                        <p>required skills: {part.requirements.join(', ')}</p>
                    </div>
                );
            default:
                return assertNever(part);
        }
    };

    return (
        <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            {checkPart(part)}
        </div>
    );
};

const Content = (props: ContentProps): JSX.Element => {
    return (
        <div>
            {props.courseParts.map(part => <Part key={part.name} part={part} />)}
        </div>
    );
};

export default Content;