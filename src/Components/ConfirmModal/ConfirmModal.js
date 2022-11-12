import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmModal = (props) => {
  const { handleDelete, onHide, ...rest } = props;
  return (
    <Modal
      {...rest}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">DELETE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete();
            onHide();
          }}
        >
          Okay
        </Button>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
