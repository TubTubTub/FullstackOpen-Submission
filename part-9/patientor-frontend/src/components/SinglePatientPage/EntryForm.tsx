import { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, RadioGroup, Radio, Button, TextField, Select, SelectChangeEvent, MenuItem, Box, Chip, Slider, Alert } from '@mui/material';
import { diagnosisCodeList } from '../../constants';

import { NewEntry } from '../../types';

import patientService from '../../services/patients';

const EntryForm = ({ patientId }: { patientId: string; }): JSX.Element => {
    const [error, setError] = useState({
        type: false,
        description: false,
        specialist: false,
        dischargeCriteria: false,
        employerName: false
    });
    const [errorMessage, setErrorMessage] = useState('');
    
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState(new Date().toISOString().split('T')[0]);
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [healthCheckRating, setHealthCheckRating] = useState(0);

    const [typeHelperText, setTypeHelperText] = useState('Select entry type');
    const [dateHelperText, setDateHelperText] = useState('Select a date');
    const [descriptionHelperText, setDescriptionHelperText] = useState('Enter a description of the entry');
    const [specialistHelperText, setSpecialistHelperText] = useState('Enter a specialist');
    const [diagnosisCodesHelperText, setDiagnosisCodesHelperText] = useState('Select diagnosis codes (optional)');
    const [dischargeDateHelperText, setDischargeDateHelperText] = useState('Select discharge date');
    const [dischargeCriteriaHelperText, setDischargeCriteriaHelperText] = useState('Enter discharge criteria');
    const [employerNameHelperText, setEmployerNameHelperText] = useState('Enter employer name');
    const [sickLeaveStartDateHelperText, setSickLeaveStartDateHelperText] = useState('Enter sick leave start date (optional)');
    const [sickLeaveEndDateHelperText, setSickLeaveEndDateHelperText] = useState('Enter sick leave end date (optional)');
    const [healthCheckRatingHelperText, setHealthCheckRatingHelperText] = useState('Select health check rating');

    const borderStyle = {
        border: "2px dotted black",
        marginTop: "0.5em",
        padding: "1em"
    };

    const healthSliderMarks = [
        { value: 0, label: 'Healthy' },
        { value: 1, label: 'Low Risk' },
        { value: 2, label: 'High Risk' },
        { value: 3, label: 'Critical Risk' },
    ];

    const handleTypeChange = (event: React.SyntheticEvent) => {
        setType((event.target as HTMLInputElement).value);
        setTypeHelperText('');
        setError({
            type: false,
            description: false,
            specialist: false,
            dischargeCriteria: false,
            employerName: false
        });
        setErrorMessage('');
    };

    const handleDateChange = (event: React.SyntheticEvent) => {
        setDate((event.target as HTMLInputElement).value);
        setDateHelperText('');
        setErrorMessage('');
    };

    const handleDescriptionChange = (event: React.SyntheticEvent) => {
        setDescription((event.target as HTMLInputElement).value);
        setDescriptionHelperText('');
        setError({ ...error, description: false});
        setErrorMessage('');
    };

    const handleSpecialistChange = (event: React.SyntheticEvent) => {
        setSpecialist((event.target as HTMLInputElement).value);
        setSpecialistHelperText('');
        setError({ ...error, specialist: false });
        setErrorMessage('');
    };

    const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value } } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(','): value
        );
        setDiagnosisCodesHelperText('');
        setErrorMessage('');
    };

    const handleDischargeDateChange = (event: React.SyntheticEvent) => {
        setDischargeDate((event.target as HTMLInputElement).value);
        setDischargeDateHelperText('');
        setErrorMessage('');
    };
    
    const handleDischargeCriteriaChange = (event: React.SyntheticEvent) => {
        setDischargeCriteria((event.target as HTMLInputElement).value);
        setDischargeCriteriaHelperText('');
        setError({ ...error, dischargeCriteria: false });
        setErrorMessage('');
    };

    const handleEmployerNameChange = (event: React.SyntheticEvent) => {
        setEmployerName((event.target as HTMLInputElement).value);
        setEmployerNameHelperText('');
        setError({ ...error, employerName: false });
        setErrorMessage('');
    };

    const handleSickLeaveStartDateChange = (event: React.SyntheticEvent) => {
        setSickLeaveStartDate((event.target as HTMLInputElement).value);
        setSickLeaveStartDateHelperText('');
        setErrorMessage('');
    };

    const handleSickLeaveEndDateChange = (event: React.SyntheticEvent) => {
        setSickLeaveEndDate((event.target as HTMLInputElement).value);
        setSickLeaveEndDateHelperText('');
        setErrorMessage('');
    };

    const handleHealthCheckRatingChange = (event: React.SyntheticEvent) => {
        setHealthCheckRating(Number((event.target as HTMLInputElement).value));
        setHealthCheckRatingHelperText('');
        setErrorMessage('');
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let errorState = error;

        if (type === '') {
            errorState = { ...errorState, type: true };
            setTypeHelperText('Please select an option.');
            setErrorMessage('Please select an option.');
        }
        if (description === '') {
            errorState = { ...errorState, description: true};
            setDescriptionHelperText('Please enter a description.');
            setErrorMessage('Please enter a description.');
        }
        if (specialist === '') {
            errorState = { ...errorState, specialist: true };
            setSpecialistHelperText('Please enter a specialist.');
            setErrorMessage('Please enter a specialist.');
        }
        if (diagnosisCodes.length === 0) {
            setDiagnosisCodesHelperText('Select diagnosis codes (optional)');
        }
        if (type === 'Hospital' && dischargeCriteria === '') {
            errorState = { ...errorState, dischargeCriteria: true };
            setDischargeCriteriaHelperText('Please enter a discharge criteria.');
            setErrorMessage('Please enter a discharge criteria.');
        }
        if (type === 'OccupationalHealthcare' && employerName === '') {
            errorState = { ...errorState, employerName: true };
            setEmployerNameHelperText('Please enter an employer name.');
            setErrorMessage('Please enter an employer name.');
        }

        if (Object.values(errorState).every((check: boolean) => check === false)) {
            const baseEntry = {
                type,
                date,
                description,
                specialist,
                diagnosisCodes
            };

            if (type === 'Hospital') {
                const newHospitalEntry: NewEntry = {
                    ...baseEntry,
                    type,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
                patientService.addPatientEntry(newHospitalEntry, patientId);
            }
            else if (type === 'OccupationalHealthcare') {
                const newOccupationalHealthcareEntry: NewEntry = {
                    ...baseEntry,
                    type,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                };
                patientService.addPatientEntry(newOccupationalHealthcareEntry, patientId);
            }
            else if (type === 'HealthCheck') {
                const newHealthCheckEntry: NewEntry = {
                    ...baseEntry,
                    type,
                    healthCheckRating
                };
                patientService.addPatientEntry(newHealthCheckEntry, patientId);
            }
        }

        setError(errorState);
    };

    return (
        <form onSubmit={handleSubmit} style={borderStyle}>
            {
                errorMessage === '' ? null : <Alert severity="error">{errorMessage}</Alert>
            }
            <FormControl variant="standard" error={error.type}>
                <FormLabel>Entry type</FormLabel>
                <RadioGroup value={type} onChange={handleTypeChange} row>
                    <FormControlLabel value="Hospital" control={<Radio size="small" />} label="Hospital" />
                    <FormControlLabel value="OccupationalHealthcare" control={<Radio size="small" />} label="Occupational Healthcare" />
                    <FormControlLabel value="HealthCheck" control={<Radio size="small" />} label="Health Check" />
                </RadioGroup>
                <FormHelperText>{typeHelperText}</FormHelperText>
            </FormControl>
            <br/>

            <TextField type="date" value={date} onChange={handleDateChange} label="Date" helperText={dateHelperText} />
            <br/>

            <TextField type="text" value={description} onChange={handleDescriptionChange} margin="normal" label="Description" helperText={descriptionHelperText} error={error.description} multiline />
            <br />

            <TextField type="text" value={specialist} onChange={handleSpecialistChange} margin="normal" label="Specialist" helperText={specialistHelperText} error={error.specialist}/>
            <br/>

            <FormControl variant="standard" sx={{ width: "300px" }}>
                <InputLabel id="diagnosis-codes-id">Diagnosis Codes</InputLabel>

                <Select labelId="diagnosis-codes-id" label="Diagnosis Codes" multiple value={diagnosisCodes} onChange={handleDiagnosisCodesChange} renderValue={
                    (selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(value => <Chip key={value} label={value} />)}
                        </Box>
                    )
                }>
                    {diagnosisCodeList.map(code => (
                        <MenuItem key={code} value={code}>{code}</MenuItem>
                    ))}
                </Select>

                <FormHelperText>{diagnosisCodesHelperText}</FormHelperText>
            </FormControl>
            <br/>
            
            {
                type !== 'Hospital' ? null :
                <FormControl variant="standard" sx={{ marginTop: "1em" }}>
                    <TextField type="date" value={dischargeDate} onChange={handleDischargeDateChange} label="Discharge Date" helperText={dischargeDateHelperText} margin="normal" />
                    <TextField type="text" value={dischargeCriteria} onChange={handleDischargeCriteriaChange} label="Description" helperText={dischargeCriteriaHelperText} error={error.dischargeCriteria} multiline />
                    <br/>
                </FormControl>
            }

            {
                type !== 'OccupationalHealthcare' ? null :
                <FormControl variant="standard">
                    <TextField type="text" value={employerName} onChange={handleEmployerNameChange} label="Employer Name" helperText={employerNameHelperText} error={error.employerName}/>
                    <TextField type="date" value={sickLeaveStartDate} onChange={handleSickLeaveStartDateChange} label="Sick leave start date" helperText={sickLeaveStartDateHelperText} margin="normal" />
                    <TextField type="date" value={sickLeaveEndDate} onChange={handleSickLeaveEndDateChange} label="Date" helperText={sickLeaveEndDateHelperText} />
                    <br />
                </FormControl>
            }

            {
                type !== 'HealthCheck' ? null :
                <FormControl variant="standard" sx={{ width: 300, marginLeft: "1em" }}>
                    <FormLabel>Health Check Rating</FormLabel>
                    <Slider min={0} max={3} defaultValue={0} step={null} valueLabelDisplay="auto" marks={healthSliderMarks} value={healthCheckRating} onChange={handleHealthCheckRatingChange} />
                        <FormHelperText>{healthCheckRatingHelperText}</FormHelperText>
                    <br/>
                </FormControl>
            }
            
            <br/>
            <Button type="submit" variant="outlined">Submit</Button>
        </form>
    );
};

export default EntryForm;