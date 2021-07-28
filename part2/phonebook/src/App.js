import React, { useState, useEffect } from 'react';

import Search from './components/Search';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import backEndFns from './services/contacts';

const notificationDuration = 2000;

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ srchStr, setsrchStr ] = useState('');
  const [ notification, setNotification ] = useState(null);

  useEffect(() => {
    backEndFns
      .getAll()
      .then(contacts => {
        setPersons(contacts);
      })
      .catch( error => {
        console.log(error.message);
      });
  }, []);


  const handleSubmit = (event) => {

    event.preventDefault();

    backEndFns.nameAlreadyExists(newName)
      .then( nameAlreadyExists => {
        let newPerson = {
          name: newName,
          number: newNumber,
          id: persons.length + 200
        };

        if(nameAlreadyExists) {
          let overWrite = window.confirm(`${newName} already exists in the phonebook. Do you want to update the number?`);
          if(overWrite) {
            let existingPerson = persons.find(person => person.name.toLowerCase().localeCompare(newName.toLowerCase()) === 0);
            newPerson.id = existingPerson.id;
            backEndFns.updateExisting(newPerson)
              .then( updatedContact => {

                let newPersons = [...persons];
                let successNotification = {
                  positive: true,
                  message: 'Updated successfully.'
                };

                newPersons = newPersons.filter(person => person.id !== updatedContact.id );
                
                setPersons(newPersons.concat(updatedContact));
                setNewName('');
                setNewNumber('');
                setNotification(successNotification);
                setTimeout(() => {
                  setNotification(null);
                }, notificationDuration);
              })
              .catch(error => {
                let failedNotification = {
                  positive: false,
                  message: error.message
                };

                setNotification(failedNotification);
                setTimeout(() => {
                  setNotification(null);
                }, notificationDuration);
              });
          }
        }
        else {
          backEndFns.createNew(newPerson)
            .then( savedContact => {
              let successNotification = {
                positive: true,
                message: 'New entry saved successfully!'
              };

              setPersons(persons.concat(savedContact));
              setNewName('');
              setNewNumber('');

              setNotification(successNotification);
              setTimeout(() => {
                setNotification(null);
              }, notificationDuration);
            })
            .catch(error => {
              console.log(error.message);
              setNewName('');
              setNewNumber('');
            });
        }
      })
      .catch(( _ ) => {
        let failureNotification = {
          positive: false,
          message: 'Something went wrong. Try later.'
        };

        setNotification(failureNotification);
        setTimeout(() => {
          setNotification(null);
        }, notificationDuration);
      });

    

  };



  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };


  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSrchStrChange = (event) => {
    setsrchStr(event.target.value);
  };

  const getDeleteButtonHandler = (personName, id) => {
    return () => {
      let deleteConfirmation = window.confirm(`Delete ${personName}?`);
      if(!deleteConfirmation) return;
      backEndFns
        .deleteContact(id)
        .then( _ => {
          let deleteNotification = {
            positive: false,
            message: 'Entry deleted successfully!'
          };

          let newPersons = [ ...persons ];
          newPersons = newPersons.filter(person => person.id !== id);
          setPersons(newPersons);

          setNotification(deleteNotification);
          setTimeout(() => {
            setNotification(null);
          }, notificationDuration);
      })
      .catch(error => {
        console.log(error.message);
        let deleteNotification = {
          positive: false,
          message: 'Entry already deleted or does not exist.'
        };

        let newPersons = [ ...persons ];
        newPersons = newPersons.filter(person => person.id !== id);
        setPersons(newPersons);

        setNotification(deleteNotification);
        setTimeout(() => {
          setNotification(null);
        }, notificationDuration);
      });
    };
  };


  let renderedPersons;

  if(srchStr.length) {
    renderedPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(srchStr.toLowerCase());
    })
  }
  else {
    renderedPersons = persons;
  }

  let notificationComponent = null;

  if(notification !== null) {
    notificationComponent = (
      <Notification
        positive={notification.positive}
        message={notification.message}
      />
    );
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <Search
        srchStr={srchStr}
        handleSrchStrChange={handleSrchStrChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />

      {
        notificationComponent
      }
      <h2>Numbers</h2>
      <Persons
        persons={renderedPersons}
        getDeleteButtonHandler={getDeleteButtonHandler}
      />

    </div>
  )
}

export default App;
