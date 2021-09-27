"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    UserName: {
        type: String,
        required: [true, 'Debe indicar el nombre de usuario']
    },
    Email: {
        type: String,
        required: [true, 'Debe indicar el email del usuario']
    },
    Password: {
        type: String,
        required: [true, 'Debe indicar la contrasena del usuario']
    }
});
userSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    delete data.Password;
    return data;
});
exports.User = mongoose_1.model('User', userSchema);
