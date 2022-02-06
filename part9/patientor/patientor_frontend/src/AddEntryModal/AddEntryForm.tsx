import React from 'react';

import { Formik, Form } from 'formik';
import { HealthCheckRating } from './../types';

import { DropDownField, TextField } from './FormField';
import { Button } from 'semantic-ui-react';

interface Props {
  onSubmit: () => void,
  onCancel: () => void
}

const AddEntryForm = ({ onSubmit, onCancel } : Props) => {

  const healthCheckEnumStuffs = Object.keys(HealthCheckRating);
  const healthCheckEnumValues = healthCheckEnumStuffs.slice(0, healthCheckEnumStuffs.length/2);
  const healthCheckEnumKeys = healthCheckEnumStuffs.slice(healthCheckEnumStuffs.length/2);
  const healthCheckDropDownOptions = healthCheckEnumKeys.map((key, index) => ({
    text: key,
    value: healthCheckEnumValues[index]
  }));

  return (
    <Formik
      initialValues={
          {
            description: '',
            specialist: '',
            healthCheckRating: HealthCheckRating.Healthy
        }
      }
      onSubmit={onSubmit}
    >
      {
        ({ isValid, dirty }) => {
          return (
            <Form>
              { isValid && dirty }

              <TextField
                name='description'
                label='Description'
                placeholder='Description'
              />

              <TextField
                name='specialist'
                label='Specialist'
                placeholder='Specialist'
              />
              
              <DropDownField
                name='healthCheckRating'
                label='Health Check Rating'
                options={healthCheckDropDownOptions}
                placeholder={HealthCheckRating[HealthCheckRating.Healthy]}
              />
              <Button onClick={onCancel}>Cancel</Button>
            </Form>
          );
        }
      }
    </Formik>
  );
};

export default AddEntryForm;