
export function makeFirstLetterCaps(inputString){
    if (inputString !== null || inputString !== undefined) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }else{
        return inputString;
    }
}

// parser function to detect new line \\n from mongodb and change it appropriately.
export const parseLines = (value) => value.replaceAll(/(\\n)/g, "\n");
// export const parseLines = (value) => value.replaceAll(/(\\n)/g, '{"\n"}');


//export makeFirstLetterCaps;