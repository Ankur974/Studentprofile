import React from "react";

import Modal from "@common/ui/Modal";
import Login from "./Login";

const LoginModal = ({ setModalOpen, page }) => (
  <Modal XS height="fit-content" togglePopup={() => setModalOpen(true)}>
    <Login setModalOpen={setModalOpen} page={page} />
  </Modal>
);

export default LoginModal;
