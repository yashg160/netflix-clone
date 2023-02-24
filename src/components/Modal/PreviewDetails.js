import React, { useState, useEffect, useRef } from 'react';

import './preview-details.scss';

const PreviewDetailsModal = ({ isOpen, onClose, dataItem }) => {
  const [modalContainerStyle, setModalContainerStyle] = useState({
    display: 'none',
  });
  const [modalBackdropStyle, setModalBackdropStyle] = useState({});
  const [modalContentStyle, setModalContentStyle] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      setModalContainerStyle({
        display: 'block',
      });

      setTimeout(() => {
        setModalBackdropStyle({
          opacity: 0.8,
        });

        setModalContentStyle({
          transform: 'scale(1)',
        });
      }, [10]);
    } else {
      document.body.style.overflow = 'auto';

      setModalBackdropStyle({
        opacity: 0,
      });

      setModalContentStyle({
        transform: 'scale(0)',
      });

      setTimeout(() => {
        setModalContainerStyle({
          display: 'none',
        });
      }, 250);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose && onClose();
  };

  return (
    <div className='preview-modal-container' style={modalContainerStyle}>
      <div
        className='modal-backdrop'
        style={modalBackdropStyle}
        onClick={(e) => handleBackdropClick(e)}
      ></div>

      <div className='modal-content-wrapper' style={modalContentStyle}>
        <div className='modal-content'></div>
      </div>
    </div>
  );
};

export default PreviewDetailsModal;
