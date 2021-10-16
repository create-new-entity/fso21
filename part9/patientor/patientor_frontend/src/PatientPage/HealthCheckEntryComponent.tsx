import React, { ReactElement } from 'react';
import { Icon } from 'semantic-ui-react';

import { HealthCheckEntry, Entry } from '../types';

type Props = {
  entry: HealthCheckEntry,
  getDiagnosisCodesContent: (entry: Entry) => ReactElement | null
};

const HealthCheckEntryComponent = ({ entry, getDiagnosisCodesContent }: Props) => {
  return (
    <React.Fragment>
      <div>
        <Icon name="heart" size="large"/> { entry.specialist }
        <p>{entry.date}</p>
        <p>{entry.description}</p>
      </div>
      { getDiagnosisCodesContent(entry) }
      <br/>
    </React.Fragment>
  );
};

export default HealthCheckEntryComponent;