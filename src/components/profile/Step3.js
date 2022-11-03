import React from 'react'

/* step3:
guest details */
const Step3 = ({ formData, setFormData }) => {
    return (
        <div className='container-sm'>
            <div className='row'>
                <div className='col'>
                    <label className='form-label'>Guests</label>
                    <input className="form-control"
                        placeholder='Guests'
                        name="guests"
                        type="number"
                        required
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    />
                </div>
                <div className='col'>
                    <label className='form-label'>Bedroom</label>
                    <input className="form-control"
                        placeholder='Bedrooms'
                        name="bedroom"
                        type="number"
                        required
                        value={formData.bedroom}
                        onChange={(e) => setFormData({ ...formData, bedroom: e.target.value })}
                    />
                </div>
                <div className='col'>
                    <label className='form-label'>Bathroom</label>
                    <input className="form-control"
                        placeholder='Bathrooms'
                        type="number"
                        name="bathroom"
                        required
                        value={formData.bathroom}
                        onChange={(e) => setFormData({ ...formData, bathroom: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}

export default Step3