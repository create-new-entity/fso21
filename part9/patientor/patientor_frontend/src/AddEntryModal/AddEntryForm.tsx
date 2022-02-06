import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react';

import { Diagnosis, HealthCheckRating } from './../types';
import { DropDownField, TextField } from './FormField';
import serviceFns from './../services';


interface Props {
  onSubmit: () => void,
  onCancel: () => void
}

interface DropDownOptionsProps {
  text: string,
  value: string
}

const AddEntryForm = ({ onSubmit, onCancel } : Props) => {

  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void (async () => {
      const newDiagnosisList = await serviceFns.getDiagnosisList();
      setDiagnosisList(newDiagnosisList);
    })();
  }, []);

  const getDiagnosisOptions = (): DropDownOptionsProps[] => {
    return diagnosisList.map((diagnosis) => {
      return {
        text: diagnosis.code + ' : ' + diagnosis.name,
        value: diagnosis.code
      };
    });
  };

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
            healthCheckRating: HealthCheckRating.Healthy,
            diagnosisCodes: []
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
                fluid
              />

              <TextField
                name='specialist'
                label='Specialist'
                placeholder='Specialist'
                fluid
              />

              <DropDownField
                name='healthCheckRating'
                label='Health Check Rating'
                options={healthCheckDropDownOptions}
                placeholder={HealthCheckRating[HealthCheckRating.Healthy]}
              />

              <DropDownField
                name='diagnosisCodes'
                label='Diagnoses'
                options={getDiagnosisOptions()}
                placeholder='Diagnoses'
                fluid
                multiple
                search
                selection
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