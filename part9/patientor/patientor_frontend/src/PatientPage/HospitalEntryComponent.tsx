import React, { ReactElement } from 'react';
import { Icon } from 'semantic-ui-react';

import { Entry, HospitalEntry } from '../types';

type Props = {
  entry: HospitalEntry,
  getDiagnosisCodesContent: (entry: Entry) => ReactElement | null
};

const HospitalEntryComponent = ({ entry, getDiagnosisCodesContent}: Props) => {
  return (
    <React.Fragment>
      <div>
        <Icon name="wheelchair" size="large"/> { entry.specialist }
        <p>{entry.date}</p>
        <p>{entry.description}</p>
      </div>
      { getDiagnosisCodesContent(entry) }
      <br/>
    </React.Fragment>
  );
};

export default HospitalEntryComponent;