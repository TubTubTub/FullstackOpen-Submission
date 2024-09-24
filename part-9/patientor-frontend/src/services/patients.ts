import axios from "axios";
import { Patient, PatientFormValues, Entry, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const addPatientEntry = async (entry: NewEntry, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`, entry
  );

  return data;
};


export default {
  getAll, create, getPatientById, addPatientEntry
};

