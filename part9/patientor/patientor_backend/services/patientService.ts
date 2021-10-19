import { v4 as uuidv4 } from 'uuid';

import { patients } from './../data/patients';
import {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  Entry,
  NewEntryForPatient
} from './../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(patient => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries
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

const addNewEntryForPatient = (newEntryForPatient: NewEntryForPatient, patientId: string): Entry => {
  const patient = getSinglePatient(patientId);
  const newPatient = { ...patient };
  if(!newPatient.entries) newPatient.entries = [];
  const entry = {
    ...newEntryForPatient,
    id: uuidv4()
  };
  newPatient.entries.push(entry);
  return entry;
};


export default {
  getNonSensitivePatients,
  addNewPatient,
  getSinglePatient,
  addNewEntryForPatient
};