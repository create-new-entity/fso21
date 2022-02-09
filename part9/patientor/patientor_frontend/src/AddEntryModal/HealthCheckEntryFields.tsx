import React from "react";
import { Field, FormikErrors } from "formik";
import { Segment } from "semantic-ui-react";
import { TextField } from "./FormField";
import { NewEntryData } from "../types";

interface {
  errors: FormikErrors<NewEntryData>['errors']
}


const HealthCheckEntryFields = () => {
  return (
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
  );
};