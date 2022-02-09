import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Button, Grid, Segment } from "semantic-ui-react";

import { Diagnosis, HealthCheckRating, NewEntryData } from "./../types";
import { EntryTypeSelection, HealthCheckSelection, TextField } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import serviceFns from "./../services";
import { getInitialValue } from "./util";

interface Props {
  onSubmit: (newEntryData: NewEntryData) => void;
  onCancel: () => void;
  selectedEntryType: string;
  handleEntryTypeChange: (newSelectedEntry: string | undefined) => void;
}

const AddEntryForm = ({ onSubmit, onCancel, selectedEntryType, handleEntryTypeChange }: Props) => {
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

  const entryTypeOptions = [
    {
      text: "HealthCheck",
      value: "HealthCheck"
    }, {
      text: "OccupationalHealthcare",
      value: "OccupationalHealthcare"
    }
  ];

  // , {
  //   text: "Hospital",
  //   value: "Hospital"
  // }


  return (
    <Formik
      initialValues={getInitialValue(selectedEntryType)}
      onSubmit={onSubmit}
      validationSchema={newEntrySchema}
    >
      {({ dirty, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <div>{selectedEntryType}</div>
            <EntryTypeSelection
              entryTypeOptions={entryTypeOptions}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              setSelectedEntryType={setSelectedEntryType}
              placeholder={selectedEntryType}
            />
            
            <Segment>
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
