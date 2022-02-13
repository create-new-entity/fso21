import React from "react";
import { ErrorMessage, Field } from "formik";
import { Segment, Form } from "semantic-ui-react";
import { TextField } from "./FormField";


const HospitalEntryFields = () => {
  return (
    <>
      <Form.Field>
        <label>Discharge</label>
        <Form.Field>
          <Segment>
            <Field
              name="discharge.date"
              label="Date"
              placeholder="Date"
              component={TextField}
            />
            <ErrorMessage name='discharge.date'/>
            
            <Field
              name="discharge.criteria"
              label="Criteria"
              placeholder="Criteria"
              component={TextField}
            />
            <ErrorMessage name="discharge.criteria"/>
            
          </Segment>
        </Form.Field>
      </Form.Field>
    </>
  );
};

export default HospitalEntryFields;