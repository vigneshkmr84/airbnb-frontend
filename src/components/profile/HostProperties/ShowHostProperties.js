import React from 'react'

const ShowHostProperties = ({ propertiesList }) => {

    const renderTable = (property) => {
        return (
            <tr key={property._id}>
                <td><a href={'./properties/' + property._id}>{property.name}</a></td>
                <td>{property.house_type}</td>
                <td>{property.is_active.toString() === "true" ? "Listed" : "Inactive"}</td>
            </tr>
        )
    }

    const rt = (list) => {
        return (
            <table class="table table-striped" style={{ width: '60%', textAlign: 'left', margin: '0 auto', marginTop: '3%' }}>
                <thead>
                    <tr>
                        <th>Property Name</th>
                        <th>Property Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map(property => {
                        return renderTable(property)
                    })}

                </tbody>
            </table>
        )
    }
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
                        rt(propertiesList)
                }
            </div>
        </div>
    )
}

export default ShowHostProperties