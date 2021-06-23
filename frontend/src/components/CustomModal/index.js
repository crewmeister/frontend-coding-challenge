import React, { useState, useEffect } from "react";

//Styled Components
import Modal from "../styled/Modal";
import ModalContent from "../styled/ModalContent";
import ModalBody from "../styled/ModalBody";
import ModalHeader from "../styled/ModalHeader";
import ModalFooter from "../styled/ModalFooter";
import Button from "../styled/Button";

const CustomModal = ({ showModal, children, toggleModal, title }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    toggleModal(false);
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <Modal visible={show}>
      <ModalContent sx={6} lg={6}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button primary onClick={handleClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
