import { v4 as uuidv4 } from 'uuid';

import { patients } from './../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient } from './../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(patient => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: []
    };
  });
};

const getSinglePatient = (id: string): (Patient | undefined) => {
  return patients.find((patient: Patient) => patient.id === id);
};

const addNewPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const newPatient = {
    ...newPatientEntry,
    id: uuidv4()
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addNewPatient,
  getSinglePatient
};