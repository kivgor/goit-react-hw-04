import Modal from 'react-modal';
Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal, urlForModal, altForModal }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      padding: '0px',
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img src={urlForModal} alt={altForModal} />
      </Modal>
    </div>
  );
};

export default ImageModal;
