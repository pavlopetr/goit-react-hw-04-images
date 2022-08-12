import { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

function Modal({ modalData, toggleModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleModal]);


  const handleCloseBackdrop = e => {
    if (e.target !== e.currentTarget) return;
    toggleModal();
  };

  return (
    <div className={s.overlay} onClick={handleCloseBackdrop}>
      <div className={s.modal}>
        <img src={modalData.src} alt={modalData.alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalData: PropTypes.object,
  toggleModal: PropTypes.func,
};

export default Modal;