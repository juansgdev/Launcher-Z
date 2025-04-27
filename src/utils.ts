export const getValueFromField = (rawText:string, field:string):string => {
    let txt:string = rawText.replace(rawText.slice(0, rawText.indexOf(`${field}`)+5), '');
    txt = txt.replace(txt.slice(txt.indexOf('\n'), txt.length+1), '');
    
    return txt;
};

export const formatFileName = (fileName:string):string => {
    let file:string = fileName.replace('.png', '');

    const arr:string[] = Array.from(file);

    for (let i = 0; i < arr.length; i++) {
        arr[i] == '-' ? arr[i] = ' ' : false;
        arr[i] == ' ' ? arr[i+1] = arr[i+1].toUpperCase() : false;
        i == 0 ? arr[i] = arr[i].toUpperCase() : false;
    }
    
    file = '';
    arr.forEach(char => {
        file = file+char;
    });
    
    return file;
};