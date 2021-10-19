/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import {
  toNewPatientEntry,
  getNewEntryTypeOfPatient
} from '../utils';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
  const nonSensitivePatients = patientService.getNonSensitivePatients();
  res.json(nonSensitivePatients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getSinglePatient(req.params.id);
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addNewPatient(newPatientEntry);
    res.json(newPatient);
  }
  catch(err) {
    let errorMessage;
    if(err instanceof Error) errorMessage = err.message;
    else errorMessage = 'Something went wrong.';
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge,
      employerName,
      sickLeave,
      healthCheckRating
    } = {
      type: req.body.type,
      description: req.body.description,
      date: req.body.date,
      specialist: req.body.specialist,
      diagnosisCodes: req.body.diagnosisCodes,
      discharge: req.body.discharge,
      employerName: req.body.employerName,
      sickLeave: req.body.sickLeave,
      healthCheckRating: req.body.healthCheckRating
    };
    const newEntryForPatient = getNewEntryTypeOfPatient(
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge,
      employerName,
      sickLeave,
      healthCheckRating
    );
    const result = patientService.addNewEntryForPatient(newEntryForPatient, req.params.id);
    res.json(result);
  }
  catch(error) {
    let errorMessage;
    if(error instanceof Error) errorMessage = error.message;
    else errorMessage = 'Something went wrong.';
    res.status(400).send(errorMessage);
  }
});

export default router;