import React, { useEffect } from "react";
import Modal from "react-modal";

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageProps;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "absolute" as "absolute", 
    inset: "auto",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    overflow: "auto",
    padding: "0",
    border: "none",
  },
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <img
        src={image.src}
        alt={image.alt}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "80vh",
          margin: "auto",
        }}
      />
    </Modal>
  );
};

export default ImageModal;
