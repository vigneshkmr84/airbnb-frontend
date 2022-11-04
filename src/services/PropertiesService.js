import { postAPICall, getAPICall } from './ApiService'
import Toast from '../components/toast/Toast';

export async function getAllProperties() {

    var response = await getAPICall('/property');
    // console.log(response.message);
    return response.message;
}


export async function getPropertyById(property_id) {
    var response = await getAPICall('/property?_id=' + property_id);
    if (response.message.length === 1) {
        // console.log(response.message[0]);
        return response.message[0];
    } else
        return {};
}

export async function getPropertyImages(property_id) {
    var response = await getAPICall('/property/' + property_id + '/images');
    console.log(response.message);
    sleep(3000)
    //console.log('Total Images : ' + response.message.images.length);
    return response.message.images;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export async function addNewProperty(newProperty) {

    var response = await postAPICall('/property', newProperty);
    console.log(response.message);

    if (response.status === 200)
        Toast('Successfully Added', 'success');
}