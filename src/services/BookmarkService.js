import { postAPICall, getAPICall } from './ApiService';
import Toast from '../components/toast/Toast';

// for the given user id get all the property details in the wishlist
export async function getUserBookmarks(user_id) {
    var response = await getAPICall('/users/' + user_id + '/favourite');
    return response.message;
}

// adding a property to wishlist for the user
export async function addToBookmarks(user_id, property_id) {

    var response = await postAPICall('/users/' + user_id + '/favourite', { _id: property_id });

    if (response.status === 200)
        Toast('Successfully Added', 'success');
}