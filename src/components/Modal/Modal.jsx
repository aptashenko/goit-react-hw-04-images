import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({modalImage, toggleModal }) {

    const handleKeyDown = (e) => {
        e.key === 'Escape' && toggleModal()
    }

    const handleBackDrop = (e) => {
        e.target === e.currentTarget && toggleModal();
    }

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown)
    
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [])


        return (
            <div className="Overlay" onClick={handleBackDrop}>
                <div className="Modal" >
                    <img src={modalImage} alt="" />
                </div>
            </div>
        )
}

Modal.propTypes = {
    toggleModal: PropTypes.func,
    modalImage: PropTypes.string,
}