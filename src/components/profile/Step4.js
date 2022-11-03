import React, { useState } from 'react'
import { makeFirstLetterCaps } from '../common/CommonUtils';
/* step4:
amenities - category wise (living, kitchen, bedroom, bathroom, garage, others) */
const Step4 = ({ formData, setFormData }) => {

    const [selected, setSelected] = useState('living');

    const [amenities, setAmenities] = useState('');

    const amenitiesList = ['living', 'kitchen', 'bedroom', 'bathroom', 'garage', 'others'];

    const updateAmenities = () => {
        let data = formData.amenities;
        let ele = data.filter((e) => e.category === selected)[0]
        ele.amenities.push(amenities)
        console.log(formData.amenities);
        setAmenities("");
        setFormData({ ...formData, amenities: formData.amenities });

    }

    const displayAmenities = () => {
        return (
            formData.amenities.map((am, index) => {
                let list = am.amenities
                if (list.length !== 0) {
                    return (
                        <ul key={index}>
                            <b>{makeFirstLetterCaps(am.category)}</b>
                            {list.map((e, i) => {
                                return (<li key={i}>{e}</li>)
                            })}
                        </ul>
                    )
                }
            })
        )
    }

    const generateOptions = () => {
        return (
            amenitiesList.map((e, i) => {
                return (
                    <option key={e} value={e}>{makeFirstLetterCaps(e)}</option>
                )
            }
            )
        )
    }
    return (
        <div className='container-sm'>
            <div className='row'>
                <select className="form-select input-sm" onChange={(e) => setSelected(e.target.value)} value={selected}>
                    {generateOptions()}
                </select>
            </div>

            <div className='row'>
                <div className='col'>
                    <input className="form-control"
                        placeholder='Add amenities'
                        name="Add amenities"
                        type="text"
                        onChange={(e) => { setAmenities(e.target.value) }}
                        value={amenities}
                        required
                    />
                </div>
                <div className='col'>
                    <button
                        className='btn btn-primary'
                        type="button"
                        name='Add'
                        onClick={updateAmenities}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            <div className='row'>
                <div> {displayAmenities()} </div>
            </div>
        </div>
    )
}

export default Step4