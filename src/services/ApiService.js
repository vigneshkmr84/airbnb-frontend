import Toast from '../components/toast/Toast';
import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:3000'
var Headers = { 'Content-Type': 'application/json' }
const Internal_Server_Error = { message: 'Unable to make API calls', status: 500 }
const errorCodes = [400, 402, 404, 500];
const unauthorized = 401;


export async function getAPICall(uri) {

    try {

        let finalURL = baseUrl + uri;
        console.log("Making GET API call to : " + finalURL);
        var response;
        Headers['Authorization'] = 'Bearer ' +  Cookies.get('token');
        console.log(Headers);
        await fetch(finalURL, {
            method: 'GET',
            headers: Headers,
        })
            .then(response => response.json())
            .then((json) => {
                response = json;
            });

        // handle the common error here
        if (errorCodes.includes(response.status))
            Toast(response.message, 'error');

        if (response.status === unauthorized) {
            Toast(response.message, 'error');
            Cookies.remove('token');
            // navigate('/login');
            window.location.href = '/login';
        }

        return response;
    } catch (error) {
        console.log("Error occurred in making GET api call : " + error);
        return Internal_Server_Error;
    }
}

export async function postAPICall(uri, body) {

    try {
        let finalURL = baseUrl + uri;
        console.log("Making POST API call to : " + finalURL);
        var response;
        await fetch(finalURL, {
            method: 'POST',
            headers: Headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then((json) => {
                response = json;
            });

        // handle the common error here
        if (errorCodes.includes(response.status))
            Toast(response.message, 'error');
        /* else
            Toast(response.message, 'success'); */

        return response;

    } catch (error) {
        console.log("Error occurred in making POST api call : " + error);
        return Internal_Server_Error;
    }
}

export async function deleteAPICall(uri, body) {
    try {

        let finalURL = baseUrl + uri;
        console.log("Making Delete API call to : " + finalURL);
        var response;
        await fetch(finalURL, {
            method: 'DELETE',
            headers: Headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then((json) => {
                response = json;
            });

        // handle the common error here
        if (errorCodes.includes(response.status))
            Toast(response.message, 'error');

        return response;
    } catch (error) {
        console.log("Error occurred in making DELETE api call : " + error);
        return Internal_Server_Error;
    }
}
const exportedFunctions = { getAPICall, postAPICall, deleteAPICall }

export default exportedFunctions
