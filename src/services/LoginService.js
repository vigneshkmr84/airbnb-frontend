
import { postAPICall } from './ApiService';
import Toast from '../components/toast/Toast';
import Cookies from 'js-cookie'


// login 
export async function login(loginObject) {

    var response = await postAPICall('/login', loginObject);

    console.log(response);
    if (response.status === 200) {
        console.log('Successfully Logged in');
        Toast('Successfully Logged in', 'success');
        console.log('Setting cookies...')
        Cookies.set('token', response.message);
        return true
    }
    return false
}


// function to sign up a new user
export async function signup(userModel) {

    var response = await postAPICall('/signup', userModel);

    console.log(response);

    if (response.status === 200)
        Toast(response.message, 'success');
}

const exportedFunctions = { login, signup }
export default exportedFunctions
