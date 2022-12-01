import { postAPICall, getAPICall, deleteAPICall } from './ApiService';
import Toast from '../components/toast/Toast';
import { getUserId } from '../components/common/CommonUtils';

// Get the list of bookings for the given user id
export async function getUserBookings() {
    var response = await getAPICall('/bookings/' + getUserId());
    return response.message;
}

// create user booking
export async function createBooking(body) {

    var response = await postAPICall('/bookings', body);
    if (response.status === 200)
        Toast('Successfully Booked', 'success');
}

// For a given user delete a booking
export async function deleteBooking(body, booking_id) {

    var response = await deleteAPICall(`/bookings/${booking_id}`);
    if (response.status === 200)
        Toast('Successfully Canceled', 'success');
}