"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromField = void 0;
var getValueFromField = function (rawText, field) {
    var txt = rawText.replace(rawText.slice(0, rawText.indexOf("".concat(field)) + 5), '');
    txt = txt.replace(txt.slice(txt.indexOf('\n'), txt.length + 1), '');
    return txt;
};
exports.getValueFromField = getValueFromField;
