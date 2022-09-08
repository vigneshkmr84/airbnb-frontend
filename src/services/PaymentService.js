import { postAPICall, getAPICall, deleteAPICall } from './ApiService'

export async function getUserPaymentDetails(user_id) {

    var response = await getAPICall('/users/' + user_id + '/payment');

    console.log(response.message.payment_details);

    return response.message;
}

export async function addPaymentDetails(user_id, userData) {

    var response = await postAPICall('/users/' + user_id, userData);

    console.log(response.message);

    return response.message;
}

export async function deletePayment(user_id, payment_id) {

    var response = await deleteAPICall('/users/' + user_id, payment_id);

    console.log(response.message);

    return response.message;
}
