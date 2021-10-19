import {
  Fields,
  NewPatientEntry,
  Gender,

  Discharge,
  DischargeFields,
  NewHospitalEntry,

  DateRange,
  DateRangeFields,
  NewOccupationalHealthcareEntry,

  HealthCheckRating,
  NewHealthCheckEntry,

  HospitalEntryFields,
  OccupationalHealthcareEntryFields,
  HealthCheckEntryFields
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Incorrect or missing ssn");

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error("Incorrect or missing gender");
  
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation");

  return occupation;
};

const parseCriteria = (criteria: unknown): string => {
  if(!criteria || !isString(criteria))
    throw new Error("Incorrect or missing criteria");

  return criteria;
};

const parseDischarge = ({ date, criteria }: DischargeFields): Discharge => {
  const newDischarge = toNewDischarge({ date, criteria });
  return newDischarge;
};

const parseStartDate = (startDate: unknown): string => {
  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing startDate: " + startDate);
  }
  return startDate;
};

const parseEndDate = (endDate: unknown): string => {
  if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing endDate: " + endDate);
  }
  return endDate;
};

const parseDateRange = ({ startDate, endDate }: DateRangeFields): DateRange => {
  return {
    startDate: parseStartDate(startDate),
    endDate: parseEndDate(endDate)
  };
};

const parseSickLeave = ({ startDate, endDate }: DateRangeFields): DateRange => {
  return parseDateRange({ startDate, endDate });
};

const parseEmployerName = (employerName: unknown): string => {
  if(!employerName || !isString(employerName))
    throw new Error("Incorrect or missing employerName");
  
  return employerName;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description))
    throw new Error("Incorrect or missing description");
  
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist))
    throw new Error("Incorrect or missing specialist");
  
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): (string[] | undefined) => {

  if(!diagnosisCodes) return;

  if(!(diagnosisCodes instanceof Array))
    throw new Error('diagnosis codes should be in an array');

  const newDiagnosisCodes = diagnosisCodes.map(code => {
    if(isString(code)) return code;
    throw new Error('diagnosis codes should be strings');
  });

  return newDiagnosisCodes;
};

const parseType = (type: unknown): string => {
  if(!type || !isString(type))
    throw new Error("Incorrect or missing specialist");
  
  return type;
};


const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if(!healthCheckRating || !isString(healthCheckRating) || !(healthCheckRating in HealthCheckRating)) throw new Error("Incorrect or missing healthCheckRating");

  const index = Object.values(HealthCheckRating).indexOf(healthCheckRating);
  return Number(Object.keys(HealthCheckRating)[index]);
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  let parsedSSN, parsedDateOfBirth;

  if(ssn) parsedSSN = parseSSN(ssn);
  if(dateOfBirth) parsedDateOfBirth = parseDate(dateOfBirth);

  return {
    name: parseName(name),
    dateOfBirth: parsedDateOfBirth,
    ssn: parsedSSN,
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
};



// HospitalEntry validation methods: toNewDischarge

const toNewDischarge = ({ date, criteria }: DischargeFields): Discharge => {
  return {
    date: parseDate(date),
    criteria: parseCriteria(criteria)
  };
};

const toNewHospitalEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: HospitalEntryFields): NewHospitalEntry => {
  
  const newHospitalEntry = {
    type,
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined,
    discharge: parseDischarge(discharge as DischargeFields)
  };

  // diagnosisCodes is optional
  if(!diagnosisCodes) delete newHospitalEntry.diagnosisCodes;

  return newHospitalEntry;
};

const toNewOccupationalHealthcare = (
  {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave
  }: OccupationalHealthcareEntryFields
): NewOccupationalHealthcareEntry => {

  const newOccupationalHealthCareEntry = {
    type,
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined,
    employerName: parseEmployerName(employerName),
    sickLeave: sickLeave ? parseSickLeave(sickLeave as DateRangeFields) : undefined
  };

  // diagnosisCodes and sickLeave are optional, so remove if they don't exist.
  if(!diagnosisCodes) delete newOccupationalHealthCareEntry.diagnosisCodes;
  if(!sickLeave) delete newOccupationalHealthCareEntry.sickLeave;

  return newOccupationalHealthCareEntry;
};

const toNewHealthCheckEntry = (
  {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    healthCheckRating
  }: HealthCheckEntryFields): NewHealthCheckEntry => {

    const newHealthCheckEntry =  {
      type,
      description: parseDescription(description),
      date: parseDate(date),
      specialist: parseSpecialist(specialist),
      diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined,
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };

    // diagnosisCodes is optional
    if(!diagnosisCodes) delete newHealthCheckEntry.diagnosisCodes;

    return newHealthCheckEntry;
};


export const getNewEntryTypeOfPatient = (
  type: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown,
  discharge: unknown,
  employerName: unknown,
  sickLeave: unknown,
  healthCheckRating: unknown
): (NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry) => {

  const parsedType = parseType(type);
  
  if(parsedType === 'Hospital') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hospitalEntryFields_UnknownValues = { type: parsedType, description, date, specialist, diagnosisCodes, discharge } as HospitalEntryFields;
    return toNewHospitalEntry(hospitalEntryFields_UnknownValues);
  }
  
  if(parsedType === 'OccupationalHealthcare') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const occupationalHealthcareEntryFields_UnknownValues = { type: parsedType, description, date, specialist, diagnosisCodes, employerName, sickLeave } as OccupationalHealthcareEntryFields;
    return toNewOccupationalHealthcare(occupationalHealthcareEntryFields_UnknownValues);
  }
  
  if(parsedType === 'HealthCheck') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const healthCheckEntryFields_UnknownValues = { type: parsedType, description, date, specialist, diagnosisCodes, healthCheckRating } as HealthCheckEntryFields;
    return toNewHealthCheckEntry(healthCheckEntryFields_UnknownValues);
  }

  throw new Error('Invalid type value of the entry');
};
