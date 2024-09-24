import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NewPatientEntry, NonSensitivePatient, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientById = (id: string): Patient => {
    const patient = patients.find(patient => patient.id === id);
    if (!patient) {
        throw new Error('No patient with requested ID found!');
    }
    return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( patient: NewPatientEntry ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addPatientEntry = ( entry: NewEntry, id: string ): Entry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    const patientIndex = patients.findIndex(patient => patient.id === id);
    patients[patientIndex].entries.push(newPatientEntry);

    return newPatientEntry;
};

export default { getPatients, getPatientById, getNonSensitivePatients, addPatient, addPatientEntry };