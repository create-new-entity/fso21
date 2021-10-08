export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth?: string | undefined,
  ssn?: string | undefined,
  gender: Gender,
  occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

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