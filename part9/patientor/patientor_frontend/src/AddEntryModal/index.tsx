import React from 'react';
import { Modal } from 'semantic-ui-react';

import AddEntryForm from './AddEntryForm';
import { NewEntryData } from './../types';

interface Props {
  modalOpen: boolean,
  onSubmit: (newEntryData: NewEntryData) => void,
  onClose: () => void
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Top Mofiz</Modal.Header>
      <Modal.Content>
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;