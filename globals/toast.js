import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "bootstrap/dist/css/bootstrap.min.css";

function ToastNotification({ show, onClose, title, message, img }) {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        const hideTimer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 500);

        return () => clearTimeout(hideTimer);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="bg-dark"
      style={{ minHeight: "240px" }}
    >
      <ToastContainer
        className="p-3"
        position={"bottom-start"}
        style={{
          zIndex: 1,
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 9999,
        }}
      >
        <Toast show={visible} onClose={() => onClose()}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastNotification;
