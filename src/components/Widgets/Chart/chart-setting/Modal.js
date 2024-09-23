import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, onCloseButtonClick, children }) => {
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (show && !event.target.closest('.modal')) {
        onCloseButtonClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [show, onCloseButtonClick]);

  // if (!show) {
  //   return null;
  // }

  return (
    <div className="modal-wrapper" style={{display: show? 'block': 'none'}}>
      <div className="modal">
        <div className='body'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;