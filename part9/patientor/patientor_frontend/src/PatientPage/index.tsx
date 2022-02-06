import React, { useEffect, useState } from "react";
import { Icon, Button } from "semantic-ui-react";
import * as uuid from "uuid";

import { Entry, NewEntryData } from "../types";
import services from "../services";
import { useStateValue, create_savePatientAction } from "../state";
import HospitalEntryComponent from "./HospitalEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";

const PatientPage = ({ id }: { id: string }) => {
  const [showEntryModal, setShowEntryModal] = useState<boolean>(false);
  const [{ patient, diagnosis }, dispatch] = useStateValue();

  useEffect(() => {
    void (async () => {
      try {
        if (patient && patient.id === id) return;

        const newPatient = await services.getSinglePatientDetails(id);
        dispatch(create_savePatientAction(newPatient));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  if (!patient) return null;

  const getDiagnosisCodesContent = (entry: Entry) => {
    let dCodes = null;
    if (entry.diagnosisCodes)
      dCodes = entry.diagnosisCodes.map((dCode) => {
        const id: string = uuid.v4();
        const name: string | undefined = diagnosis.find(
          (d) => d.code === dCode
        )?.name;
        return (
          <li key={id}>
            {dCode} {name}
          </li>
        );
      });
    return (
      <div>
        <ul>{dCodes}</ul>
      </div>
    );
  };

  const filterEntry = (entry: Entry) => {
    const assertUnreachable = (_entry: never): never => {
      throw new Error(`Unknown 'Entry' type.`);
    };

    const id = uuid.v4();

    switch (entry.type) {
      case "Hospital":
        return (
          <HospitalEntryComponent
            key={id}
            entry={entry}
            getDiagnosisCodesContent={getDiagnosisCodesContent}
          />
        );

      case "HealthCheck":
        return (
          <HealthCheckEntryComponent
            key={id}
            entry={entry}
            getDiagnosisCodesContent={getDiagnosisCodesContent}
          />
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntryComponent
            key={id}
            entry={entry}
            getDiagnosisCodesContent={getDiagnosisCodesContent}
          />
        );

      default:
        assertUnreachable(entry);
    }
  };

  const handleNewEntrySubmission = (newEntryData: NewEntryData) => {
    console.log(newEntryData);
  };

  return (
    <React.Fragment>
      <div>
        <h2 style={{ display: "inline-block" }}>{patient.name}</h2>
        <Icon
          style={{ verticalAlign: "baseline" }}
          className={patient.gender === "male" ? "mars" : "venus"}
          size="large"
        ></Icon>
      </div>
      <div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <br />
      <AddEntryModal
        modalOpen={showEntryModal}
        onSubmit={handleNewEntrySubmission}
        onClose={() => setShowEntryModal(false)}
      />
      <Button color="green" onClick={() => setShowEntryModal(true)}>
        New Entry
      </Button>
      <br />
      <br />
      <strong>
        <p>Entries:</p>
      </strong>
      <hr />
      {patient.entries.map((entry) => filterEntry(entry))}
    </React.Fragment>
  );
};

export default PatientPage;
