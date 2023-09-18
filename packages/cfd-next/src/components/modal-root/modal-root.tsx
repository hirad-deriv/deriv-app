import React from 'react';
import CFDPasswordModal from 'src/components/cfd-pasword-modal/cfd-password-modal';
import Modal from '../modal/modal';
import { TCFDModals } from '../../types';

type TModalRoot = {
    modal_type: TCFDModals;
    modal_content: React.ReactNode;
};
const MODAL_COMPONENTS = {
    cfd_password_modal: CFDPasswordModal,
};
const ModalRoot = ({ modal_type, modal_content }: TModalRoot) => {
    const [modal_name, setModalName] = React.useState('');
    const [is_modal_visible, setIsModalVisible] = React.useState(false);
    React.useEffect(() => {
        if (modal_type) {
            setIsModalVisible(true);
        }
    }, [modal_type]);

    Object.keys(MODAL_COMPONENTS).map(modal => {
        if (modal_type === modal) {
            return setModalName(modal);
        }
    });

    if (!modal_type) return null;

    return (
        <Modal
            is_open={is_modal_visible}
            title={modal_name}
            toggleModal={() => setIsModalVisible(!is_modal_visible)}
            has_close_icon
        >
            {modal_content}
        </Modal>
    );
};
export default ModalRoot;
