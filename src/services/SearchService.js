import { getAPICall } from './ApiService';

export async function searchProperty(searchQuery) {

    let queryParam = Object.keys(searchQuery).map(function (key) {
        if (searchQuery[key] !== "")
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(searchQuery[key])
    }).join('&');

    if (queryParam.startsWith("&"))
        queryParam = queryParam.substring(1)

    if (queryParam.endsWith("&"))
        queryParam = queryParam.substring(0, queryParam.length - 1)

    console.log(queryParam)

    var response = await getAPICall('/properties?' + queryParam)
        .then(res => {
            console.log(res)
            return res
        });

    // console.log(response.message);

    return response.message;
}