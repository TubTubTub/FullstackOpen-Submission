import { useState } from 'react';
import { DiaryFormProps, NewDiaryEntry, Visibility, Weather } from '../types';

const DiaryForm = ({ addDiaryEntry }: DiaryFormProps): JSX.Element => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const visibilityInput = visibility as Visibility;
        const weatherInput = weather as Weather;

        const diaryToAdd: NewDiaryEntry = {
            date,
            visibility: visibilityInput,
            weather: weatherInput,
            comment
        };

        addDiaryEntry(diaryToAdd);

        setDate(new Date().toISOString().split('T')[0]);
        setVisibility('');
        setWeather('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                date <input type="date" value={date} onChange={({ target }) => setDate(target.value)}/>
            </div>
            <div>
                visibility
                {
                    Object.values(Visibility).map(option =>
                        <span>
                            <input type="radio" id={option} name="visibility" onChange={() => setVisibility(option)}/>
                            <label htmlFor={option}>{option}</label>
                        </span>
                    )
                }
            </div>
            <div>
                weather
                {
                    Object.values(Weather).map(option => 
                            <span>
                                <input type="radio" id={option} name="weather" onChange={() => setWeather(option)}/>
                                <label htmlFor={option}>{option}</label>
                            </span>
                    )
                }
            </div>
            <div>
                comment <input type="comment" value={comment} onChange={({ target }) => setComment(target.value)}/>
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default DiaryForm;