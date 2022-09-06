import { postAPICall, getAPICall } from './ApiService'

export async function getUserProfile(user_id) {

    var response = await getAPICall('/users/' + user_id);
    console.log(response.message);
    return response.message;
}

export async function updateUserProfile(user_id, userData) {

    var response = await postAPICall('/users/' + user_id, userData);

    console.log(response.message);

    return response.message;
}
