import { NewPatientEntry, Gender, Entry, NewEntry, HealthCheckRating, DiagnosisEntry } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatient: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries),
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
    return typeof text == 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
    const parts = ssn.split('-');
    console.log(parts, 'parts');
    return parts.length == 2;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(gender => gender.toString()).includes(param);
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
    return entries as Entry[];
};

const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in object && 'description' in object && 'specialist' in object && 'type' in object) {
        const baseEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            ...('diagnosisCodes' in object) && { diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) }
        };

        switch (object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    const newHospitalEntry: NewEntry = {
                        ...baseEntry,
                        type: "Hospital",
                        discharge: parseDischarge(object.discharge)
                    };
                    return newHospitalEntry;
                }
                throw new Error('Incorrect data: discharge field is missing');
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    const newOccupationalHealthcareEntry: NewEntry = {
                        ...baseEntry,
                        type: "OccupationalHealthcare",
                        employerName: parseEmployerName(object.employerName),
                        ...('sickLeave' in object) && { sickLeave: parseSickLeave(object.sickLeave) }
                    };
                    return newOccupationalHealthcareEntry;
                }
                throw new Error('Incorrect data: employerName field is missing');
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    const newHealthCheckEntry: NewEntry = {
                        ...baseEntry,
                        type: "HealthCheck",
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    };
                    return newHealthCheckEntry;
                }
                throw new Error('Incorrect data: healthCheckRating field is missing');
            
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};

const isObject = (testObject: unknown): testObject is object => {
    return typeof testObject == 'object' || testObject instanceof Object;
};

const isNumber = (testNumber: unknown): testNumber is number => {
    return typeof testNumber == 'number' || testNumber instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(rating => Number(rating)).includes(param);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<DiagnosisEntry['code']> => {
    if (!isObject(diagnosisCodes)) {
        throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
    }
    return diagnosisCodes as Array<DiagnosisEntry['code']>;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string; } => {
    if (!isObject(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        const newSickLeave: { startDate: string; endDate: string; } = {
            startDate: parseDate(sickLeave.startDate),
            endDate: parseDate(sickLeave.endDate)
        };
        return newSickLeave;
    }
    throw new Error('Incorrect data: some sickLeave fields are missing');
};

const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing string: ' + description);
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    };

    return specialist;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string; } => {
    if (!isObject(discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    if ('date' in discharge && 'criteria' in discharge) {
        const newDischarge: { date: string; criteria: string; } = {
            date: parseDate(discharge.date),
            criteria: parseCriteria(discharge.criteria)
        };
        return newDischarge;
    }
    throw new Error('Incorrect data: some discharge fields are missing');
};

const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {
        throw new Error('Incorrect or missing discharge criteria: ' + criteria);
    }

    return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }

    return employerName;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }

    return healthCheckRating;
};

export { toNewPatientEntry, toNewEntry };