import { DiaryEntriesProps } from '../types';

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps): JSX.Element => {
    if (diaryEntries.length === 0) return <div>loading...</div>;

    return (
        <div>
            {diaryEntries.map(entry =>
                <div key={entry.id}>
                    <h4>{entry.date}</h4>
                    visibiliy: {entry.visibility}
                    <br/>
                    weather: {entry.weather}
                </div>
            )}
        </div>
    );
};

export default DiaryEntries;