import React from "react";

import Modal from "@common/ui/Modal";
import Login from "./Login";

const LoginModal = ({ setModalOpen, page }) => (
  <Modal
    S
    height="fit-content"
    borderRadius="0.5rem"
    togglePopup={() => setModalOpen(true)}
  >
    <Login setModalOpen={setModalOpen} page={page} />
  </Modal>
);

export default LoginModal;
