import React from 'react'

/* step2:
cost details */
const Step2 = ({ formData, setFormData }) => {
    return (
        <div className='container-sm'>
            <div className='row'>
                <div className='col '>
                    <label className='form-label'>Cost per day</label>
                    <input className="form-control"
                        placeholder='Cost/day'
                        name="cost_per_day"
                        type="number"
                        required
                        //defaultValue={0}
                        value={formData.cost_per_day}
                        onChange={(e) => setFormData({ ...formData, cost_per_day: e.target.value })}
                    >
                    </input>
                </div>

                <div className='col '>
                    <label className='form-label'>Cleaning cost</label>
                    <input className="form-control"
                        placeholder='Cleaning Cost'
                        name="cleaning_cost"
                        type="number"
                        required
                        //defaultValue={0}
                        value={formData.cleaning_cost}
                        onChange={(e) => setFormData({ ...formData, cleaning_cost: e.target.value })}
                    >
                    </input>
                </div>

                <div className='col '>
                    <label className='form-label'>Service cost</label>
                    <input className="form-control"
                        placeholder='Service cost'
                        name="service_cost"
                        type="number"
                        required
                        //defaultValue={0}
                        value={formData.service_cost}
                        onChange={(e) => setFormData({ ...formData, service_cost: e.target.value })}
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}


export default Step2