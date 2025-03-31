"use client";

import { useModal } from "../contexts/ModalContext";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 p-4">
        <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
          &times;
        </button>
        {content}
      </div>
    </div>
  );
}

export default Modal;