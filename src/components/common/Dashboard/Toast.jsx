import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const commonToastProps = {
  position: "bottom-left",
  autoClose: 5000,
  closeButton: false,
  hideProgressBar: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
};

const showSuccessToast = message => {
  toast(message, {
    ...commonToastProps,
    className:
      "common-toast-container toast-success-container-fill toast-success-container-after",
  });
};

const showErrorToast = message => {
  toast(message, {
    ...commonToastProps,
    className:
      "common-toast-container toast-error-container-fill toast-error-container-after",
  });
};

const showInfoToast = message => {
  toast(message, {
    ...commonToastProps,
    className:
      "common-toast-container toast-info-container-fill toast-error-container-after",
  });
};

export { showSuccessToast, showErrorToast, showInfoToast };
