import { postAPICall, getAPICall } from './ApiService';
import Toast from '../components/toast/Toast';
import { getUserId } from '../components/common/CommonUtils';

// Query Parameter - property_id, host_id, page_no, page_size
export async function getReviewsForPropertyId(property_id, page_no, page_size) {
    var response = await getAPICall('/review?property_id=' + property_id + '&page_no=' + page_no + '&page_size=' + page_size);
    return response.message.docs;
}

export async function addUserReviewForProperty(body, property_id) {
    body["guest_id"] = getUserId()
    body["property_id"] = property_id
    var response = await postAPICall('/review', body);

    if (response.status === 200)
        Toast('Successfully Added', 'success');

}