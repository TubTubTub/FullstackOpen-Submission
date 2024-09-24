import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../../types';
import { Typography, SvgIcon } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';

import EntryForm from './EntryForm';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

import patientService from '../../services/patients';

const SinglePatientPage = (): JSX.Element | null => {
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const id = useParams().id;
    
    useEffect(() => {
        if (id) {
            patientService.getPatientById(id)
                .then(response => setPatientData(response));
        }
    }, [id]);

    if (!patientData) return null;

    const returnSVGIcon = () => {
        switch (patientData.gender) {
            case 'male':
                return <SvgIcon component={Male} fontSize="large"></SvgIcon>;
            case 'female':
                return <SvgIcon component={Female} fontSize="large"></SvgIcon>;
            case 'other':
                return <SvgIcon component={Transgender} fontSize="large"></SvgIcon>;
        }
    };

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    const getEntryDetails = (entry: Entry): JSX.Element => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry key={entry.id} entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry key={entry.id} entry={entry} />;
            case "HealthCheck":
                return <HealthCheckEntry key={entry.id} entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    return (
        <div>
            <Typography variant="h4" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
                {patientData.name} {returnSVGIcon()}
            </Typography>

            <Typography variant="body1">ssh: {patientData.ssn}</Typography>
            <Typography variant="body1">occupation: {patientData.occupation}</Typography>
            
            {
                (!id) ? null : <EntryForm patientId={id} />
            }
            
            <Typography variant="h5" style={{ marginTop: "0.3em", marginBottom: "0.3em" }}>entries</Typography>
            {patientData.entries.length !== 0 ? null : <Typography variant="body1">No entries found!</Typography>}
            {
                patientData.entries.map(entry => getEntryDetails(entry))
            }
        </div>
    );
};

export default SinglePatientPage;