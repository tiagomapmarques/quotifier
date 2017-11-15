"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isArray = require("isarray");
var quote = require("quote");
var unquote = require("unquote");
var arrayReduce = function (object, handler) { return object.map(handler); };
var objectReduce = function (object, handler) { return Object.keys(object).reduce(function (collection, key) {
    return (__assign({}, collection, (_a = {}, _a[key] = handler(object[key]), _a)));
    var _a;
}, {}); };
var transformer = function (keyHandler) { return function (element) {
    return typeof element === 'string' ? keyHandler(element) : quotifyAction(keyHandler)(element); // tslint:disable-line:no-use-before-declare
}; };
var quotifyAction = function (keyHandler) { return function (object) {
    if (isArray(object)) {
        return arrayReduce(object, transformer(keyHandler));
    }
    return objectReduce(object, transformer(keyHandler));
}; };
exports.quotifier = quotifyAction(quote);
exports.unquotifier = quotifyAction(unquote);
