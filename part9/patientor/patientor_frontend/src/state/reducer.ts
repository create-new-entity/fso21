import * as _ from "lodash";

import { State } from "./state";
import { Diagnosis, HealthCheckEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SAVE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[]
    }
  | {
      type: "ADD_NEW_ENTRY_FOR_PATIENT",
      payload: {
        id: string,
        newEntry: HealthCheckEntry
      }
    };

export const create_setAddNewEntryOfPatientAction = (id: string, newEntry: HealthCheckEntry): Action => {
  return {
    type: "ADD_NEW_ENTRY_FOR_PATIENT",
    payload: {
      id,
      newEntry
    }
  };
};

export const create_setPatientListAction = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const create_addPatientAction = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const create_savePatientAction = (patient: Patient): Action => {
  return {
    type: "SAVE_PATIENT",
    payload: patient
  };
};

export const create_setDiagnosisListAction = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SAVE_PATIENT":
      return {
        patients: {
          ...state.patients
        },
        patient: {
          ...action.payload
        },
        diagnosis: [ ...state.diagnosis ]
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        patients: {
          ...state.patients
        },
        patient: state.patient,
        diagnosis: action.payload
      };
    case "ADD_NEW_ENTRY_FOR_PATIENT":
      const newState = _.cloneDeep(state);
      newState.patients[action.payload.id].entries = [...state.patients[action.payload.id].entries, action.payload.newEntry];
      return {
        patients: newState.patients,
        patient: newState.patients[action.payload.id],
        diagnosis: newState.diagnosis
      };
    default:
      return state;
  }
};
