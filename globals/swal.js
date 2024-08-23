import Swal from "sweetalert2";

export const SUCCESS_MESSAGE = (title, message, callback) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      if (callback) {
        callback();
      }
    }
  });
};

export const ERROR_MESSAGE = (title, message) => {
  Swal.fire(title, message, "error");
};

export const EXCEPTION_ERROR_MESSAGE = (message) => {
  Swal.fire("Exception error", message, "info");
};
