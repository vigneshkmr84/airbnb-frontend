import React, { useEffect, useState } from 'react';
import './PropertyDetails.css';
import Sidebar from '../../sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getPropertyById, getPropertyImages } from '../../../services/PropertiesService';
import PropertyImagesDisplay from './PropertyImagesDisplay';
// import BsPlusCircle from 'react-icons/bs'
// import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import BodyDetailsAccordion from './BodyDetailsAccordion';


const PropertyDetails = () => {
    let property_id = useParams();
    // let property_id = '631abfd2ff027fd82e85f6e0';

    // const [propertyDetails, setPropertyDetails] = useState({});

    console.log(property_id);
    const propertyDetails = {
        _id: "6312928f0cb7dbbc5df57f60",
        host_id: "63083a889346efce3db6a4e9",
        name: "Sunset View Santa Monica",
        description: "My house is walking distance to the dowtown area, brewcaipa brewery, flag hill park (awesome views at night of the cities). Yucaipa is a quaint little town in the middle of everything. 10 minutes from oak Glenn apple orchards. 15 mins to redlands. 20 mins to loma linda. 25 minutes from forest falls with amazing hikes and views. 25 minutes from the National orange show events. 40 minutes from glen helen ampitheater. 45 mins to palm springs. 1 hr to big bear. Please also read during your stay.",
        location: "5151 San hose, Santa Monica, California",
        cost_per_day: 212,
        cleaning_cost: 70,
        service_cost: 50,
        amenities: [
            {
                category: "bedroom",
                amenities: [
                    "essentials",
                    "hangers",
                    "blankets",
                    "iron"
                ]
            },
            {
                category: "kitchen",
                amenities: [
                    "dish-washer",
                    "washer",
                    "plates",
                    "iron"
                ]
            },
            {
                category: "entertainment",
                amenities: [
                    "4k TV",
                    "playstation",
                    "sound system",
                    "playstation-5"
                ]
            }
        ],
        avg_rating: 0,
        guests: 10,
        bedroom: 3,
        bathroom: 2.5,
        checkin_time: 810,
        checkout_time: 660,
        cancellation_policy: "Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.",
        host_is_superhost: false,
        house_rules: [
            "No Pets Allowed",
            "No Parties",
            "Quiet Time from 10pm - 7am",
            "No Smoking"
        ],
        created_at: "2022-09-02T23:31:58.043Z",
        updated_at: "2022-09-02T23:31:58.043Z",
        __v: 0
    }

    const [totalCost, setTotalCost] = useState(0);

    /* onParameterChange() = (e) => {
        setTotalCost
    } */

    // console.log(property_details)

    /* useEffect(() => {
        console.log(property_id)
        console.log('fetching property details for id')

        getPropertyById(property_id.id)
            .then((res) => {
                setPropertyDetails(res);
            });
        console.log(propertyDetails);

    }, []); */

    return (

        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Sidebar />
            <div id='property-details-container' style={{ width: '100%' }}>
                <div className="container rounded bg-white mt-5 mb-5" >
                    <h1 className='propertyDetailsHeader'>{propertyDetails.name}</h1>
                    <div className='propertyDetailsBody'>

                        <div className='imagesBody'>
                            <PropertyImagesDisplay />
                        </div>

                        <div className='detailsBody'>

                            <br></br>
                            <br></br>
                            {/* <h3>Know About the property</h3> */}
                            <div id='propertyDescription'>
                                <BodyDetailsAccordion
                                    property_details={propertyDetails}
                                />
                            </div>
                            <div id='reservationFormDiv' className='col-6 col-lg-4'>


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
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div >
        </div >
    )
}

export default PropertyDetails