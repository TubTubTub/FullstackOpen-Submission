import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

const DiagnosisList = ({ diagnosisCodes }: { diagnosisCodes: string[] | undefined}): JSX.Element | null => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        diagnosesService.getAll()
        .then(response => setDiagnoses(response));
    }, []);

    const findDiagnosisDescription = (code: string): string | undefined => {
        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis?.name;
    };

    if (!diagnosisCodes) return null;

    return (
        <ul>
            {diagnosisCodes?.map(code =>
                <li key={code}><Typography variant="body1">
                    {code} {findDiagnosisDescription(code)}
                </Typography></li>
            )}
        </ul>
    );
};

export default DiagnosisList;