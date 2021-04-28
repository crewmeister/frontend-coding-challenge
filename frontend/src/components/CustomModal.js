import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

//Actions
import actions from "../redux/actions";

//Styled Components
import Modal from "./styled/Modal";
import ModalContent from "./styled/ModalContent";
import ModalBody from "./styled/ModalBody";
import ModalHeader from "./styled/ModalHeader";
import ModalFooter from "./styled/ModalFooter";

const CustomModal = ({ showModal, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    actions.handleModal(false);
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <Modal visible={show}>
      <ModalContent>
        <ModalHeader>Details of user</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Ok</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    showModal: state.absences.showModal,
  };
};

export default connect(mapStateToProps)(CustomModal);
