import { postAPICall, getAPICall } from './ApiService'
import Toast from '../components/toast/Toast'

// Will get the user details for profile page for a single user
// based on the id 
export async function getUserProfile(user_id) {

    var response = await getAPICall('/users/' + user_id);
    console.log(response.message);
    return response.message;
}

// Based on Form submit will update the user profile
// update to the user id provided
export async function updateUserProfile(user_id, userData) {

    console.log(userData)
    var response = await postAPICall('/users/' + user_id + '/update', userData);

    console.log(response.message);
    if (response.status === 200) {
        Toast('Successfully Updated', 'success');
    }

    return response.message;
}
