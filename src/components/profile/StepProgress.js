import React, { useState } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

const StepProgress = ({ formData, setFormData }) => {
    const [page, setPage] = useState(0);

    const formTitle = ['Basic details', 'Cost details ($)', 'Guests', 'Amenities', 'House rules', 'Photos', 'Cancellation Policy'];

    const displayForm = () => {


        switch (page) {
            case 0:
                return <Step1 formData={formData} setFormData={setFormData} />;
            case 1:
                return <Step2 formData={formData} setFormData={setFormData} />;
            case 2:
                return <Step3 formData={formData} setFormData={setFormData} />;
            case 3:
                return <Step4 formData={formData} setFormData={setFormData} />;
            case 4:
                return <Step5 formData={formData} setFormData={setFormData} />;
            case 5:
                return <Step6 formData={formData} setFormData={setFormData} />;
            case 6:
                return <Step7 formData={formData} setFormData={setFormData} />;

            default: return null;
        }
    }

    const widthStyle = () => {
        let w = (page + 1) * 100 / formTitle.length;
        return w.toString() + '%';
    }

    return (
        <div className='form'>
            <div className='form-container'>
                <div className='progress-header'>
                    <h5>{formTitle[page]}</h5>
                </div>
                <div className='progressbar'>
                    <div style={{ width: `${widthStyle()}`, backgroundColor: '#4181ff', height: '7px' }}></div>
                </div>
                <div className='progress-body'>
                    {displayForm()}
                </div>


                <div className='progress-footer' style={{ paddingTop: '7%', paddingBottom: '4%' }}>
                    <button
                        className='btn btn-primary'
                        type="button"
                        name='Prev'
                        hidden={page === 0}
                        onClick={() => { setPage((currPage) => currPage - 1) }}
                    >
                        <i className="bi bi-arrow-left"></i>&nbsp;Prev
                    </button>
                    <button
                        className='btn btn-primary'
                        type="button"
                        name='Next'
                        style={{ float: 'right' }}
                        hidden={page === formTitle.length - 1}
                        onClick={() => { setPage((currPage) => currPage + 1) }}
                    >
                        Next&nbsp;<i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepProgress
