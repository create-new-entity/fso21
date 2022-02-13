import React from "react";
import { ErrorMessage, Field } from "formik";
import { Segment, Form } from "semantic-ui-react";
import { TextField } from "./FormField";


const OccupationalHealthcareEntry = () => {
  return (
    <>
      <Field
        name="employerName"
        label="Employer Name"
        placeholder="Employer Name"
        component={TextField}
      />
      <ErrorMessage name='employerName'/>

      <Form.Field>
        <label>Sick Leave</label>
        <Form.Field>
          <Segment>

            <Field
                name="sickLeave.startDate"
                label="Start Date"
                placeholder="Start Date"
                component={TextField}
            />
            <ErrorMessage name="sickLeave.startDate"/>
            
            <Field
              name="sickLeave.endDate"
              label="End Date"
              placeholder="End Date"
              component={TextField}
            />
            <ErrorMessage name="sickLeave.endDate"/>
            
          </Segment>
        </Form.Field>
      </Form.Field>
    </>
  );
};

export default OccupationalHealthcareEntry;