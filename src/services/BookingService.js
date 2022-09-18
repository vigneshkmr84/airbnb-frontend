import { postAPICall, getAPICall, deleteAPICall } from './ApiService';
import Toast from '../components/toast/Toast';

// Get the list of bookings for the given user id
export async function getUserBookings(user_id) {
    var response = await getAPICall('/booking/' + user_id);
    return response.message;
}

// adding a property to wishlist for the user
export async function addBooking(body) {

    var response = await postAPICall('/booking', body);
    if (response.status === 200)
        Toast('Successfully Added', 'success');
}

// For a given user delete a booking
export async function deleteBooking(body, booking_id) {

    var response = await deleteAPICall('/booking/' + booking_id);
    if (response.status === 200)
        Toast('Successfully Canceled', 'success');
}