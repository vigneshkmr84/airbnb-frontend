import React from 'react'
import { Modal } from 'react-bootstrap'
import { callToBecomeHost } from '../../services/LoginService'
import { renderCancelButton, renderSubmitButton } from '../common/IconButtons'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../common/CommonUtils'
import Toast from '../toast/Toast';

const BecomeHostModal = ({ host, setHost }) => {

    const navigate = useNavigate();

    const onClickSubmitToBecomeHost = async () => {
        console.log('Become host clicked');
        await callToBecomeHost()
            .then(
                await removeToken()
                    .then(setHost(false))
                    .then(navigate('/login'))
                    .then(Toast('Successfully Logged out', 'success'))
            )
    }

    return (
        <Modal show={host} id='becomeHostId' backdrop='static' keyboard={true}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>Become a host</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Great. Airdnd welcomes you to be a host</h5>
                <br></br>
                You could earn while renting your property and build a community.
                <br></br><br></br>
                Once you have become host, you will be allowed to list your properties in the profile section.
                <br></br>
                <br></br>
                <br></br>
                <span style={{ fontSize: '18px' }}>You will be redirected to login page to see the effects.</span>
                <br></br>
                <br></br>
                <br></br>
                <h4 style={{textAlign: 'center'}}> Happy Hosting!!!</h4>
                <br></br>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>

                <button
                    className='btn btn-secondary btn-md'
                    onClick={() => setHost(!host)}>
                    {renderCancelButton()}

                </button>
                <button
                    className='btn btn-primary btn-md'
                    onClick={onClickSubmitToBecomeHost}
                >
                    {renderSubmitButton()}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default BecomeHostModal