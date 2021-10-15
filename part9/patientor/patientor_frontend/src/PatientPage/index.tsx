import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import * as uuid from 'uuid';

import { Entry } from '../types';
import services from '../services';
import { useStateValue, create_savePatientAction } from '../state';

const PatientPage = ({ id }: { id: string }) => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();

  useEffect(() => {
     void (
      async () => {
        try {
          if(patient && patient.id === id) return;

          const newPatient = await services.getSinglePatientDetails(id);
          dispatch(create_savePatientAction(newPatient));
        }
        catch(err) {
          console.log(err);
        }
      }
    )();
  }, [id]);

  if(!patient) return null;

  const getEntryContent = (entry: Entry) => {
    let dCodes = null;
    if(entry.diagnosisCodes) dCodes = entry.diagnosisCodes.map(dCode => {
      const id: string = uuid.v4();
      const name: string | undefined = diagnosis.find(d => d.code === dCode)?.name;
      return <li key={id}>{dCode} {name}</li>;
    });
    const content = `${entry.date} ${entry.description}`;
    const id: string = uuid.v4();
    return (
      <div key={id}>
        <p>{content}</p>
        <ul>
          {
            dCodes
          }
        </ul>
      </div>
    );
  };

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
      <br/>
      <br/>
      <strong><p>entries</p></strong>
      {
        patient.entries.map(entry => getEntryContent(entry))
      }
    </React.Fragment>
  );
};

export default PatientPage;