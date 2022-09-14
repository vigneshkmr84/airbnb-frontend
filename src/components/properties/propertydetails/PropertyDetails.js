import React, { useEffect, useState } from 'react';
import './PropertyDetails.css';
import Sidebar from '../../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getPropertyById, getPropertyImages } from '../../../services/PropertiesService';
import PropertyImagesDisplay from './PropertyImagesDisplay';
import BodyDetailsAccordion from './BodyDetailsAccordion';
import { getReviewsForPropertyId } from '../../../services/ReviewsService';
import { getUserProfile } from '../../../services/ProfileService';
import { Spinner } from 'react-bootstrap';


const PropertyDetails = () => {
    let property_id = useParams();
    // let property_id = '631abfd2ff027fd82e85f6e0';

    const [propertyDetails, setPropertyDetails] = useState(null);
    const [propertyTopReviews, setPropertyTopReviews] = useState(null);
    const [hostDetails, setHostDetails] = useState(null);

    const [loading, setLoading] = useState(false);

    // console.log(property_id);


    // fetching the property details
    useEffect(() => {
        let isCalled = false
        console.log('fetching property details for id : ' + property_id.id)


        if (!isCalled) {
            getPropertyById(property_id.id)
                .then((res) => {
                    setPropertyDetails(res);
                });
        }
        console.log('Retrieved All property details');
        return () => {
            isCalled = true;
        }
    }, []);

    // fetching the top 5 reviews for the property
    useEffect(() => {

        async function apiCall() {
            await getReviewsForPropertyId(property_id.id, 1, 5)
                .then((res) => {
                    setPropertyTopReviews(res);
                });
        }

        apiCall();

        console.log(propertyTopReviews)
        console.log('Retrieved Top 5 Reviews');

        // console.log(propertyTopReviews);
    }, []);


    // fetching the host details 
    useEffect(() => {
        setLoading(true);
        getUserProfile('6316bca14fad5c24245666ca')
            .then((res) => {
                setHostDetails(res);
            }).finally(() => {
                setLoading(false);
            });


        console.log('Retrieved Host Details');

    }, []);

    return (

        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            {propertyDetails && hostDetails && propertyTopReviews &&
                <div id='property-details-container' style={{ width: '100%' }}>
                    <div className="container rounded bg-white mt-5 mb-5" >
                        <h1 className='propertyDetailsHeader'>{propertyDetails.name}</h1>
                        <div className='propertyDetailsBody'>

                            <div className='imagesBody'>
                                {/* {loading ? <p>Loading....</p> : <PropertyImagesDisplay />} */}
                                {loading ? <Spinner animation="grow" /> : <PropertyImagesDisplay />}

                            </div>

                            <div className='detailsBody'>

                                <br></br>
                                <br></br>
                                <div style={{ height: '10%' }}>
                                    <div className='row' style={{ margin: '0 auto', /* textAlign: 'center', */ backgroundColor: 'rgb(128 128 128 / 20%)', width: '70%', borderRadius: '9px', paddingTop: '2%', paddingLeft: '3%', paddingBottom: '1%' }}>
                                        {/* <div className='col-md-6'> */}
                                        <h5>{propertyDetails.one_line_description} Hosted by <a href={'/user/' + hostDetails._id}>{hostDetails.first_name} </a></h5>
                                        <p>{propertyDetails.guests} guests &bull; {propertyDetails.bedroom} bedroom &bull; {propertyDetails.bathroom} bath</p>
                                        {/* </div> */}

                                        {/* <div className='col-md-6'>
                                        <img src={"data:image/svg+xml;base64," + hostDetails.profile_photo} alt="Profile Picture"
                                            style={{ objectFit: 'contain', width: '40%', height: '50%' }}
                                        />
                                        <h6><a href={'/user/' + hostDetails._id}>{hostDetails.first_name} {hostDetails.last_name}</a> </h6>
                                    </div> */}
                                    </div>
                                </div>
                                <br></br>
                                <div id='propertyDescription'>
                                    <BodyDetailsAccordion
                                        // property_details={propertyDetails}
                                        details={{
                                            property_details: propertyDetails
                                            , reviews: propertyTopReviews
                                            , hostDetails: hostDetails
                                            , property_id: property_id
                                        }}
                                    />
                                </div>

                                {/* uncomment the reservation form */}
                                {/* <div id='reservationFormDiv' className='col-6 col-lg-4'>


                                <form className='container was-validated' id='reserveForm'>
                                    <h4 className='reserveFormHeader'>Reserve Property</h4>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label className='form-label control-label'>Checkin date</label>
                                            <input type='date'
                                                className='form-control mr-sm-2'
                                                placeholder='Check-in'
                                                min={new Date().toISOString().slice(0, 10)}
                                                defaultValue={new Date().toISOString().slice(0, 10)}
                                                name='checkin_date'
                                            />
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label control-label'>Checkout date</label>
                                            <input type='date'
                                                className='form-control mr-sm-2'
                                                placeholder='Check-out'
                                                min={new Date(new Date().valueOf() + 86400000).toISOString().slice(0, 10)}
                                                defaultValue={new Date(new Date().valueOf() + 86400000).toISOString().slice(0, 10)}
                                                name='checkout_date'
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <label className='form-label control-label'>Guests</label>
                                            <input type='number'
                                                className='form-control mr-sm-2'
                                                placeholder='Guests'
                                                name='guests'
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12' style={{ textAlign: 'center' }}>
                                            <button
                                                className="btn btn-primary btn-lg"
                                                type="button"
                                                id='reserveButton'
                                            > Reserve
                                            </button>
                                        </div>
                                        <hr style={{ margin: '1rem 0', border: 0, color: 'red' }} />
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12' id='calculatedValues'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    ${propertyDetails.cost_per_day} x 12 nights
                                                </div>
                                                <div className='col-md-6'>
                                                    $1514
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    Cleaning fee
                                                </div>
                                                <div className='col-md-6'>
                                                    ${propertyDetails.cleaning_cost}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    Service fee
                                                </div>
                                                <div className='col-md-6'>
                                                    ${propertyDetails.cost_per_day}
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <b>Total (before taxes)</b>
                                                </div>
                                                <div className='col-md-6'>
                                                    <b>${propertyDetails.cost_per_day}*2 + {propertyDetails.cleaning_cost} + {propertyDetails.service_cost}</b>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div> */}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div >
            }
        </div >
    )
}

export default PropertyDetails