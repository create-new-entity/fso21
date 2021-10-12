/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import { toNewPatientEntry } from '../utils';
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

export default router;