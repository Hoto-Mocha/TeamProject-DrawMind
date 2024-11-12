import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ show, handleClose, title, message, noBtnMsg, yesBtnMsg, yesBtnHandler }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {noBtnMsg}
                </Button>
                <Button variant="primary" onClick={() => {
                    yesBtnHandler()
                    handleClose()
                }}>
                    {yesBtnMsg}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;