
export function makeFirstLetterCaps(inputString){
    if (inputString !== null || inputString !== undefined) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }else{
        return inputString;
    }
}

//export makeFirstLetterCaps;