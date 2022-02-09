import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';

import AddEntryForm from './AddEntryForm';
import { NewEntryData } from './../types';

interface Props {
  modalOpen: boolean,
  onSubmit: (newEntryData: NewEntryData) => void,
  onClose: () => void
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose }: Props) => {
  const initialEntryType = "HealthCheck";
  const [selectedEntryType, setSelectedEntryType] = useState<string>(initialEntryType);

  const handleEntryTypeChange = (newEntryType: string) => {
    if(newEntryType) setSelectedEntryType(newEntryType);
  };


  
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>New Entry</Modal.Header>
      <Modal.Content>
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          selectedEntryType={selectedEntryType}
          handleEntryTypeChange={handleEntryTypeChange}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;