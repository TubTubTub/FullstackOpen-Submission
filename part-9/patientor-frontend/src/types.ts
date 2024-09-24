export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface HospitalProps {
    entry: HospitalEntry;
}

export interface OccupationalProps {
    entry: OccupationalHealthcareEntry;
}

export interface HealthCheckProps {
    entry: HealthCheckEntry;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;