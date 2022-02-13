import { HealthCheckRating, NewEntryData } from "../types";

export const getInitialValue = (newEntryType: string): NewEntryData => {
  switch(newEntryType) {
    case 'HealthCheck':
      return {
        type: 'HealthCheck',
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: []
      };

    case 'OccupationalHealthcare':
      return {
        type: 'OccupationalHealthcare',
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      };
    case 'Hospital':
      return {
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        }
      };
    default:
      throw new Error('Invalid entry type.');
  }
};
