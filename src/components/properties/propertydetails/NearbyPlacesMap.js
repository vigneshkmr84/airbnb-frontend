import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const NearbyPlacesMap = () => {
    
    const mapStyles = {
        height: "65vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: -33.8688, lng: 151.2093
    }

    // NEED TO WORK AGAIN
    /* 
    const [nearByPlaces, setNearByPlaces] = useState([]);
    // const types = "museum,restaurants,amusement_park,cafe,movie_theater,church,casino,stadium,supermarket,zoo,train_station";
    const types = 'restaurant';
    const googleAPIUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHD5Azdp9yEur5KnVYJAUNf8ZAw6m40F4&radius=1000&"

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/path/to/resource.js";
        script.async = true;
        document.body.appendChild(script);

        let url = googleAPIUrl + "location=" + defaultCenter.lat + "," + defaultCenter.lng + "&type=" + types;
        console.log('Final url : ' + url);
        async function getData() {
            await fetch(url, {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {
                    if (response.ok)
                        return response.json();
                })
                .then(data => {
                    let places = [];
                    for (let googlePlace of data.results) {
                        var place = {};
                        var myLat = googlePlace.geometry.location.lat;
                        var myLong = googlePlace.geometry.location.lng;
                        var coordinate = {
                            latitude: myLat,
                            longitude: myLong,
                        };
                        // place['placeTypes'] = googlePlace.types;
                        place['coordinate'] = coordinate;
                        place['placeId'] = googlePlace.place_id;
                        place['placeName'] = googlePlace.name;
                        places.push(place);
                    }
                    console.log(places.length);
                    setNearByPlaces(places);
                    console.log(nearByPlaces.length);
                });
        }
        getData();

    }, []); */

    return (
        <div>
            {/* <Helmet>
                <script async
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHD5Azdp9yEur5KnVYJAUNf8ZAw6m40F4&libraries=places">
                </script>
            </Helmet> */}
            <LoadScript
                googleMapsApiKey='AIzaSyDHD5Azdp9yEur5KnVYJAUNf8ZAw6m40F4'>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={15}
                    yesIWantToUseGoogleMapApiInternals
                    center={defaultCenter}
                >
                    <Marker position={defaultCenter}></Marker>
                </GoogleMap>
            </LoadScript>
            <div id="map">

            </div>
        </div>
    )
}

export default NearbyPlacesMap