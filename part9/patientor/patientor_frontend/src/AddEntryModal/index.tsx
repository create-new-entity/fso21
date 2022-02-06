import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean,
  onClose: () => void
}

const AddEntryModal = ({ modalOpen, onClose }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Top Mofiz</Modal.Header>
      <Modal.Content>
        <AddEntryForm onSubmit={() => { console.log('hum'); }} onCancel={() => {console.log('ham');}}/>
        <Button onClick={onClose}>Close</Button>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;