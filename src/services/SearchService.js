import { getAPICall } from './ApiService';

export async function searchProperty(searchQuery) {

    var response = await getAPICall('/search/' + searchQuery);
    console.log(response.message);

    return response.message;
}