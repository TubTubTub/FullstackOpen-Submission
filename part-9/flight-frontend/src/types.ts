export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

export interface DiaryEntry {
    id: string;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntriesProps {
    diaryEntries: NonSensitiveDiaryEntry[];
}

export interface DiaryFormProps {
    addDiaryEntry: (arg0: NewDiaryEntry) => void;
}

export interface ErrorNotificationProps {
    errorMessage: string;
}