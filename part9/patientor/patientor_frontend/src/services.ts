import axios from "axios";

import { Patient } from "./types";

const baseURL ='http://localhost:3001';
const patientEndPoint = baseURL + '/api/patients';

const getSinglePatientDetails = async (id: string) => {
  const url = `${patientEndPoint}/${id}`;
  const res = await axios.get<Patient>(url);
  return res.data;
};  

export default {
  getSinglePatientDetails
};