import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (request, response) => {
    const id = request.params.id;
    try {
        const patient = patientsService.getPatientById(id);
        response.status(200).json(patient);
    } catch(error) {
        if (error instanceof Error) {
            response.status(400).send({ error: error.message });
        }
    }
});

router.post('/', (request, response) => {
    try {
        const newPatientEntry = toNewPatientEntry(request.body);
        const addedPatient = patientsService.addPatient(newPatientEntry);
        response.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (request, response) => {
    const id = request.params.id;
    try {
        const newEntry = toNewEntry(request.body);
        const addedPatientEntry = patientsService.addPatientEntry(newEntry, id);
        response.json(addedPatientEntry);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        response.status(400).send(errorMessage);
    }
});

export default router;