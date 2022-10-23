import React from 'react'
import { Modal } from 'react-bootstrap'


const AddPropertyModal = ({ showNewPropertyModal, cancelNewPropertyModal }) => {
    return (
        <Modal show={showNewPropertyModal} id='newPaymentModalId' backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center' }}>List a Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <div className='row'>
                        <div className='col col-md-12'>
                            <label className='form-label'>Property title </label>
                            <input className="form-control"
                                placeholder='Property title'
                                name="name"
                                required
                            >
                            </input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-md-12'>
                            <label className='form-label'>Location </label>
                            <input className="form-control"
                                placeholder='Location'
                                name="location"
                                required
                            >
                            </input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col col-md-12'>
                            <label className='form-label'>Cost Per day </label>
                            <input className="form-control"
                                placeholder='Cost Per day'
                                name="cost_per_day"
                                required
                            >
                            </input>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>

                <button className='btn btn-secondary btn-md' onClick={() => cancelNewPropertyModal()}>
                    Cancel
                </button>
                <button className='btn btn-danger btn-md' /* onClick={submitNewPayment} */>
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddPropertyModal