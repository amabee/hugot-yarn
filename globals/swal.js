import Swal from "sweetalert2";

export const SUCCESS_MESSAGE = (title, message) => {
  Swal.fire(title, message, "success");
};

export const ERROR_MESSAGE = (title, message) => {
  Swal.fire(title, message, "error");
};

export const EXCEPTION_ERROR_MESSAGE = (message) => {
  Swal.fire("Exception error", message, "information");
};
