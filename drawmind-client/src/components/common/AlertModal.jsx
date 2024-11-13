import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal({ show, handleClose, title, message }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AlertModal;