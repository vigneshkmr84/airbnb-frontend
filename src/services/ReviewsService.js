import { postAPICall, getAPICall } from './ApiService';
import Toast from '../components/toast/Toast';

// Query Parameter - property_id, host_id, page_no, page_size
export async function getReviewsForPropertyId(property_id, page_no, page_size) {
    var response = await getAPICall('/review?property_id=' + property_id + '&page_no=' + page_no + '&page_size=' + page_size);
    // console.log(response.message);
    return response.message.docs;
}

export async function addUserReviewForProperty(user_id) {
    /* var response = await getAPICall('/users/' + user_id + '/favourite');
    
    if ( response.status === 200 )
        Toast('Successfully Added', 'success');
    return response.message; */
}