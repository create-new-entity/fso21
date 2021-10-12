import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';

import services from '../services';
import { useStateValue } from '../state';

const PatientPage = ({ id }: { id: string }) => {
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
     void (
      async () => {
        try {
          if(patient && patient.id === id) return;

          const newPatient = await services.getSinglePatientDetails(id);
          dispatch({
            type: "SAVE_PATIENT",
            payload: newPatient
          });
        }
        catch(err) {
          console.log(err);
        }
      }
    )();
  }, [id]);

  if(!patient) return null;

  return (
    <React.Fragment>
      <div >
        <h2 style={{ display: 'inline-block' }}>{patient.name}</h2>
        <Icon style={{verticalAlign: 'baseline'}} className={ patient.gender === 'male' ? 'mars' : 'venus' } size="large"></Icon>
      </div>
      <div>
        <p>ssn: { patient.ssn }</p>
        <p>occupation: { patient.occupation }</p>
      </div>
    </React.Fragment>
  );
};

export default PatientPage;