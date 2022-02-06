import axios from "axios";

import { Patient, Diagnosis, NewEntryData, HealthCheckEntry } from "./types";

const baseURL ='http://localhost:3001';
const patientEndPoint = baseURL + '/api/patients';
const diagnosisEndPoint = baseURL + '/api/diagnosis';

const getSinglePatientDetails = async (id: string) => {
  const url = `${patientEndPoint}/${id}`;
  const res = await axios.get<Patient>(url);
  return res.data;
};

const getDiagnosisList = async () => {
  const res = await axios.get<Diagnosis[]>(diagnosisEndPoint);
  return res.data;
};

const addNewEntryOfPatient = async (patientId: string, newEntry: NewEntryData) => {
  const addNewEntryEndPoint = `${patientEndPoint}/${patientId}/entries`;
  const res = await axios.post<HealthCheckEntry>(addNewEntryEndPoint, newEntry);
  return res.data;
};

export default {
  getSinglePatientDetails,
  getDiagnosisList,
  addNewEntryOfPatient
};