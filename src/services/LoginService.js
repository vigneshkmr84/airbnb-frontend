
import { postAPICall } from './ApiService';
import Toast from '../components/toast/Toast';
import Cookies from 'js-cookie'
import { sleep } from './PropertiesService';
import { getUserId } from '../components/common/CommonUtils';


// login 
export async function callLoginApi(loginObject) {

    /* var response = await postAPICall('/login', loginObject);

    console.log(response);
    if (response.status === 200) {
        console.log('Successfully Logged in');
        Toast('Successfully Logged in', 'success');
        console.log('Setting cookies...')
        Cookies.set('token', response.message);
        sleep(1000);
    }
    return response.status; */

    var response = await postAPICall('/login', loginObject)
        .then(res => {
            if (res.status === 200) {
                console.log('Successfully Logged in');
                Toast('Successfully Logged in', 'success');
                console.log('Setting cookies...');
                Cookies.set('token', res.message);
                sleep(1000);
                console.log('Cookies set');
                return res.status
            }
        });

    console.log("login response : ", response);
    return response
    /* console.log(response);
    if (response.status === 200) {
        console.log('Successfully Logged in');
        Toast('Successfully Logged in', 'success');
        console.log('Setting cookies...')
        Cookies.set('token', response.message);
        sleep(1000);
    }
    return response.status; */
}


// function to sign up a new user
export async function callSignupApi(userModel) {

    var response = await postAPICall('/signup', userModel);

    console.log(response);

    if (response.status === 200)
        Toast(response.message, 'success');

    return response.status
}


export async function callToBecomeHost() {
    await postAPICall('/users/' + getUserId() + '/toHost')
        .then(res => {
            if (res.status === 200)
                Toast(res.message, 'success')
        })
}
const exportedFunctions = { login: callLoginApi, signup: callSignupApi }
export default exportedFunctions
