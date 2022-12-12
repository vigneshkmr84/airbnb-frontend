import { postAPICall, getAPICall, deleteAPICall, putAPICall } from './ApiService';
import Toast from '../components/toast/Toast';
import { getUserId } from '../components/common/CommonUtils';

// Get the list of bookings for the given user id
export async function getUserBookings() {
    var response = await getAPICall('/bookings/' + getUserId());
    return response.message;
}

// create user booking
export async function createBooking(body) {

    await postAPICall('/bookings', body)
        .then((res) => {
            if (res.status === 200)
                Toast('Successfully Booked', 'success');
        });
    ;

}

// For a given user delete a booking
export async function deleteBooking(booking_id) {

    await deleteAPICall(`/bookings/${booking_id}`)
        .then((res) => {
            if (res.status === 200)
                Toast('Successfully Canceled', 'success');
        });

}


export async function updateBooking(booking_id, body) {

    await putAPICall(`/bookings/${booking_id}`, body)
        .then((res) => {
            if (res.status === 200)
                Toast('Successfully Updated', 'success')
        });
}