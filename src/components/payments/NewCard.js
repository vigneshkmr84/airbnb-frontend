import React from 'react'
import { Modal, Button } from "react-bootstrap";
import './Payment.css'

const NewCard = (showModal) => {
    return (
        <Modal /* show={isLogOutOpen}  */ show={showModal} id='modal-id'>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout ?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" /* onClick={submitLogOut} */>
                    Yes
                </Button>
                <Button variant="secondary" /* onClick={setModalIsOpenToFalse} */>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewCard