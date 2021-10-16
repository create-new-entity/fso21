import React, { ReactElement } from "react";
import { Icon } from "semantic-ui-react";

import { OccupationalHealthcareEntry, Entry } from "../types";

type Props = {
  entry: OccupationalHealthcareEntry,
  getDiagnosisCodesContent: (entry: Entry) => ReactElement | null
};

const OccupationalHealthcareEntryComponent = ({ entry, getDiagnosisCodesContent }: Props) => {
  return (
    <React.Fragment>
      <div>
        <Icon name="doctor" size="large"/> { entry.specialist }
        <p>{entry.employerName}</p>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
      </div>
      { getDiagnosisCodesContent(entry) }
      <br/>
    </React.Fragment>
  );
};

export default OccupationalHealthcareEntryComponent;