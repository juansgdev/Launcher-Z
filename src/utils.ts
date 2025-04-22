export const getValueFromField = (rawText:string, field:string):string => {
    let txt:string = rawText.replace(rawText.slice(0, rawText.indexOf(`${field}`)+5), '');
    txt = txt.replace(txt.slice(txt.indexOf('\n'), txt.length+1), '');
    
    return txt;
};