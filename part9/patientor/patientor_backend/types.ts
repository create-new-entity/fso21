export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string | undefined;
  ssn?: string | undefined;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface DateRange {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: DateRange
}

export interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewEntryForPatient = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;

export type Fields = {
  name: unknown,
  dateOfBirth?: unknown,
  ssn?: unknown,
  gender: unknown,
  occupation: unknown
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export interface DischargeFields {
  date: unknown;
  criteria: unknown;
}

export interface HospitalEntryFields {
  type: 'Hospital';
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  discharge: unknown;
}

export interface DateRangeFields {
  startDate: unknown,
  endDate: unknown
}

export interface OccupationalHealthcareEntryFields {
  type: 'OccupationalHealthcare';
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  employerName: unknown;
  sickLeave?: unknown;
}

export interface HealthCheckEntryFields {
  type: 'HealthCheck';
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating: unknown;
}

