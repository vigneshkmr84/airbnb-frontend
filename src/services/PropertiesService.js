import { postAPICall, getAPICall } from './ApiService'


export async function getAllProperties() {

    var response = await getAPICall('/property');
    console.log(response.message);
    return response.message;
}


export async function getPropertyById(property_id) {
    var response = await getAPICall('/property/' + property_id);
    console.log(response.message);
    return response.message;
}


export async function addNewProperty(newProperty) {

    var response = await postAPICall('/property', newProperty);
    console.log(response.message);
    return response.message;
}