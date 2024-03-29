import React from 'react'

/* step1:
title
description
single_line_description
location (coordinates)
checkin & checkout time */
const Step1 = ({ formData, setFormData, propertyDataErrors }) => {
    return (
        <div className='basic-details-container'>
            <div className='row'>
                <div className='col col-md-12'>
                    <label className='form-label'>Property title </label>
                    <input className="form-control"
                        placeholder='Property title'
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.name}</small>
                </div>
            </div>
            <div className='row'>
                <div className='col col-md-12'>
                    <label className='form-label'>Location </label>
                    <input className="form-control"
                        placeholder='Location'
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.location}</small>
                </div>
            </div>

            {/* Latitude and longitude */}
            <div className='row'>
                <div className='col col-md-6'>
                    <label className='form-label'>Latitude </label>
                    <input className="form-control"
                        placeholder='Latitude'
                        name="latitude"
                        type="text"
                        required
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.latitude}</small>
                </div>
                <div className='col col-md-6'>
                    <label className='form-label'>Longitude </label>
                    <input className="form-control"
                        placeholder='Longitude'
                        name="longitude"
                        type="text"
                        required
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.longitude}</small>
                </div>
            </div>
            <div className='row'>
                <div className='col col-md-12'>
                    <label className='form-label'>Property type</label>
                    <select className="form-select input-sm"
                        placeholder='Property type'
                        name="house_type"
                        type="text"
                        required
                        value={formData.house_type}
                        onChange={(e) => setFormData({ ...formData, house_type: e.target.value })}
                    >
                        <option value="villa" >Villa</option>
                        <option value="house">House</option>
                        <option value="bunglow">Bunglow</option>
                        <option value="apartment">Apartment</option>
                    </select>
                    <small className='error'>{propertyDataErrors.house_type}</small>
                </div>
            </div>
            <div className='row'>
                <div className='col col-md-12'>
                    <label className='form-label'>Description </label>
                    <textarea className="form-control"
                        placeholder='Description'
                        name="description"
                        type="text"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.description}</small>
                </div>
            </div>
            <div className='row'>
                <div className='col col-md-12'>
                    <label className='form-label'>One Line Description </label>
                    <input className="form-control"
                        placeholder='One Line Description'
                        name="one_liner"
                        type="text"
                        required
                        value={formData.one_liner}
                        onChange={(e) => setFormData({ ...formData, one_liner: e.target.value })}
                    />
                    <small className='error'>{propertyDataErrors.one_liner}</small>
                </div>
            </div>
        </div>
    )
}

export default Step1