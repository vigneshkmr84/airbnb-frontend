
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import moment from "moment";


export function getToken() {
    return Cookies.get('token');
}
export function getUserId() {
    let token = getToken();
    if (token === null || token === undefined) {
        console.log('token missing');
        return null;
    }
    else {
        let decoded = jwtDecode(token);
        return decoded.user_id;
    }
}
export function makeFirstLetterCaps(inputString) {
    if (inputString !== null || inputString !== undefined) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    } else {
        return inputString;
    }
}

// parser function to detect new line \\n from mongodb and change it appropriately.
export const parseLines = (value) => value.replaceAll(/(\\n)/g, "\n");
// export const parseLines = (value) => value.replaceAll(/(\\n)/g, '{"\n"}');


//export makeFirstLetterCaps;


export const dateFormat = (date) => {
    let df = moment(date).format('DD-MMM-YYYY')
    // console.log(df);
    return df;
}


export const dateGreaterCheck = (d1, d2) => {
    d1 = new Date(d1).getTime();
    d2 = new Date(d2).getTime();

    return d1 > d2;
}