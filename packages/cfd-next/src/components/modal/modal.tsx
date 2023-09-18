import React from 'react';

// Define the props for the Modal component
type TModal = {
    is_open: boolean;
    onClose?: () => void;
    title: string;
    children: React.ReactNode;
    has_close_icon?: boolean;
    toggleModal: () => void;
};

const Modal = ({ is_open, onClose, title, children, has_close_icon }: TModal) => {
    if (!is_open) return null;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2>{title}</h2>
                    {has_close_icon && (
                        <button className='close-button' onClick={onClose}>
                            X
                        </button>
                    )}
                </div>
                <div className='modal-body'>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
