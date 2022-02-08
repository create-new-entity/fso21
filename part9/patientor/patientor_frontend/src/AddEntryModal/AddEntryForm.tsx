import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Button, Grid } from "semantic-ui-react";

import { Diagnosis, HealthCheckRating, NewEntryData } from "./../types";
import { HealthCheckSelection, TextField } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import serviceFns from "./../services";

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

  const healthCheckEnumStuffs = Object.keys(HealthCheckRating);
  const healthCheckEnumValues = healthCheckEnumStuffs.slice(
    0,
    healthCheckEnumStuffs.length / 2
  );
  const healthCheckEnumKeys = healthCheckEnumStuffs.slice(
    healthCheckEnumStuffs.length / 2
  );
  const healthCheckDropDownOptions = healthCheckEnumKeys.map((key, index) => ({
    text: key,
    value: healthCheckEnumValues[index],
  }));

  const requiredErrorMsg = 'Field Required!!';
  const invalidDateErrorMsg = 'Invalid Date Format!! Should be YYYY-MM-DD.';
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const newEntrySchema = Yup.object().shape({
    description: Yup.string().required(requiredErrorMsg),
    date: Yup.string().required(requiredErrorMsg).trim().matches(dateRegex, invalidDateErrorMsg),
    specialist: Yup.string().required(requiredErrorMsg),
    healthCheckRating: Yup.string().required(requiredErrorMsg)
  });


  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validationSchema={newEntrySchema}
    >
      {({ dirty, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              name="description"
              label="Description"
              placeholder="Description"
              component={TextField}
            />

            {
              errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null
            }

            <Field
              name="date"
              label="Date"
              placeholder="Date"
              component={TextField}
            />

            {
              errors.date && touched.date ? (
                <div>{errors.date}</div>
              ) : null
            }

            <Field
              name="specialist"
              label="Specialist"
              placeholder="Specialist"
              component={TextField}
            />

            {
              errors.specialist && touched.specialist ? (
                <div>{errors.specialist}</div>
              ) : null
            }

            <DiagnosisSelection
              diagnoses={diagnosisList}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <HealthCheckSelection
              healthCheckOptions={healthCheckDropDownOptions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            
            {
              errors.healthCheckRating && touched.healthCheckRating ? (
                <div>{errors.healthCheckRating}</div>
              ) : null
            }

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
