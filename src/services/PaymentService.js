// import { Toast } from 'react-bootstrap';
import Toast from '../components/toast/Toast';
import { postAPICall, getAPICall, deleteAPICall } from './ApiService'

export async function getUserPaymentDetails(user_id) {

    var response = await getAPICall('/users/' + user_id + '/payment');

    console.log(response.message.payment_details);
    return response.message.payment_details;
}

export async function addPaymentDetails(user_id, paymentType, userData) {

    var response = await postAPICall('/users/' + user_id + '/payment?type=' + paymentType, userData);

    console.log(response.message);

    if ( response.status === 200){
        Toast('Added Successfully', 'success');
    }

    return response.message;
}

export async function deletePayment(user_id, payment_id) {

    var response = await deleteAPICall('/users/' + user_id + '/payment', payment_id);

    console.log(response.message);

    return response.message;
}
