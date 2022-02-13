import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Button, Grid, Segment } from "semantic-ui-react";

import { Diagnosis, NewEntryData } from "./../types";
import { EntryTypeSelection, TextField } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import serviceFns from "./../services";
import { getInitialValue } from "./util";
import HealthCheckEntryFields from "./HealthCheckEntryFields";
import OccupationalHealthcareEntryFields from "./OccupationalHealthcareEntryFields";
import HospitalEntryFields from "./HospitalEntryFields";

interface Props {
  onSubmit: (newEntryData: NewEntryData) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  

  useEffect(() => {
    void (async () => {
      const newDiagnosisList = await serviceFns.getDiagnosisList();
      setDiagnosisList(newDiagnosisList);
    })();
  }, []);
  
  const requiredErrorMsg = 'Field Required!!';
  const invalidDateErrorMsg = 'Invalid Date Format!! Should be YYYY-MM-DD.';
  const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;

  const newEntrySchema = Yup.object().shape({
    type: Yup.string().required(requiredErrorMsg),
    description: Yup.string().required(requiredErrorMsg),
    date: Yup.string().required(requiredErrorMsg).trim().matches(dateRegex, invalidDateErrorMsg),
    specialist: Yup.string().required(requiredErrorMsg),

    healthCheckRating: Yup.string().when('type', { is: 'HealthCheck', then: Yup.string().required(requiredErrorMsg) }),

    employerName: Yup.string().when('type', { is: 'OccupationalHealthcare', then: Yup.string().required(requiredErrorMsg) }),
    sickLeave: Yup.object().when('type', {
      is: 'OccupationalHealthcare',
      then: Yup.object().shape({
        startDate: Yup.string().trim().matches(dateRegex, invalidDateErrorMsg),
        endDate: Yup.string().trim().matches(dateRegex, invalidDateErrorMsg)
      })
    }),

    discharge: Yup.object().when('type', {
      is: 'Hospital',
      then: Yup.object().shape({
        date: Yup.string().trim().matches(dateRegex, invalidDateErrorMsg).required(requiredErrorMsg),
        criteria: Yup.string().trim().required(requiredErrorMsg)
      })
    })
  });

  const entryTypeOptions = [
    {
      text: "HealthCheck",
      value: "HealthCheck"
    },
    {
      text: "OccupationalHealthcare",
      value: "OccupationalHealthcare"
    },
    {
      text: "Hospital",
      value: "Hospital"
    }
  ];


  return (
    <Formik
      initialValues={getInitialValue('HealthCheck')}
      onSubmit={onSubmit}
      validationSchema={newEntrySchema}
    >
      {({ dirty, errors, touched, values, resetForm, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <EntryTypeSelection
              entryTypeOptions={entryTypeOptions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              resetForm={resetForm}
              placeholder={values.type}
            />
            
            <Segment>
              <Field
                name="description"
                label="Description"
                placeholder="Description"
                component={TextField}
              />
              <ErrorMessage name='description'/>

              <Field
                name="date"
                label="Date"
                placeholder="Date"
                component={TextField}
              />
              <ErrorMessage name='date'/>

              <Field
                name="specialist"
                label="Specialist"
                placeholder="Specialist"
                component={TextField}
              />
              <ErrorMessage name='specialist'/>

              <DiagnosisSelection
                diagnoses={diagnosisList}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              
              {
                values.type === 'HealthCheck' ? 
                <HealthCheckEntryFields
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  touched={touched}
                  errors={errors}
                /> : null
              }

              {
                values.type === 'OccupationalHealthcare' ?
                <OccupationalHealthcareEntryFields/> : null
              }

              {
                values.type === 'Hospital' ?
                <HospitalEntryFields/> : null
              }
              
            </Segment>

            <Grid>
              <Grid.Column width={6} floated="left">
                <Button onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column width={6} floated="right">
                <Button
                  type="submit"
                  color="green"
                  floated="right"
                  disabled={!dirty}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
