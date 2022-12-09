import { postAPICall, getAPICall } from './ApiService'

export async function getAllProperties() {

    var response = await getAPICall('/properties');
    // console.log(response.message);
    return response.message;
}


export async function getPropertyById(property_id) {
    var response = await getAPICall('/properties?_id=' + property_id);
    if (response.message.length === 1) {
        return response.message[0];
    } else
        return {};
}

export async function getPropertyImages(property_id) {
    var response = await getAPICall('/properties/' + property_id + '/images');
    sleep(3000)
    console.log(response.message.images);
    return response.message;
}

export const sleep = (milliseconds) => {
    console.log('Sleep for ', milliseconds);
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export async function addNewProperty(newProperty) {

    var response = await postAPICall('/properties', newProperty)
    return response
}


export async function addPropertyImages(propertyImages, id) {
    console.log('setting property images')
    var response = await postAPICall('/properties/' + id + '/images', propertyImages);
    console.log(response.message);

    return response;
}