import express from 'express';

import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res) => {
  const nonSensitivePatients = patientService.getNonSensitivePatients();
  res.json(nonSensitivePatients);
});

export default router;