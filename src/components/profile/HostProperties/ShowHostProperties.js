import React from 'react'

const ShowHostProperties = ({ propertiesList }) => {
    return (
        <div style={{ marginTop: '5%', textAlign: 'center' }}>
            <div className='header'>
                <h4>Hosted Properties</h4>
            </div>

            <div className='mainBody'>
                {
                    propertiesList.length === 0 ?
                        <>
                            <br></br>
                            <h6> Currently you do not have any properties listed. Click on add property to list yours.</h6>
                        </>
                        :
                        propertiesList?.map(property => {
                            return (
                                <div className='row' key={property._id} >

                                    <div className='col-md-6' style={{ textAlign: 'left' }}>
                                        <a href={'./properties/' + property._id}>{property.name}</a>
                                    </div>
                                    <div className='col-md-6' style={{ textAlign: 'left' }}>
                                        <p>{property.is_active ? "Active" : "Deleted"}</p>
                                    </div>

                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default ShowHostProperties