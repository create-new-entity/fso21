import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { create_setPatientListAction, create_setDiagnosisListAction } from "./state";
import services from './services';

const App = () => {
  const [{ diagnosis }, dispatch] = useStateValue();
  const match = useRouteMatch< { id: string } | null >('/patients/:id');
  let id = '';
  console.log(diagnosis);

  
  if(match && match.params) id = match.params.id;
  
  React.useEffect(() => {

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(create_setPatientListAction(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const diagnosisList = await services.getDiagnosisList();
        dispatch(create_setDiagnosisListAction(diagnosisList));
      }
      catch(e) {
        console.log(e);
      }
    };

    if(!diagnosis.length) void fetchDiagnosisList();

    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            <PatientPage id={id}/>
          </Route>
          <Route path="/">
            <PatientListPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
