import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from './types';
import ErrorNotification from './components/ErrorNotification';
import DiaryForm from './components/DiaryForm';
import DiaryEntries from './components/DiaryEntries';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

const App = () => {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
      .then(response => {
        setDiary(response.data);
      });
  }, []);
  
  const addDiaryEntry = async (diaryToAdd: NewDiaryEntry) => {
    try {
      const newDiaryEntry = await axios.post<DiaryEntry>(baseUrl, diaryToAdd);
      setDiary(diary.concat(newDiaryEntry.data));
    } catch(error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        console.log('Uncaught error: ' + error);
      }
    }
    
  };

  return (
    <div>
      <h2>Diary Entries</h2>
      <ErrorNotification errorMessage={errorMessage} />
      <DiaryForm addDiaryEntry={addDiaryEntry}/>
      <DiaryEntries diaryEntries={diary} />
    </div>
  );

};

export default App;