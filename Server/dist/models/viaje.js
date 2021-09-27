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
exports.ToDo = exports.CriticalityToDo = void 0;
var mongoose_1 = require("mongoose");
var toDoSchema = new mongoose_1.Schema({
    Description: {
        type: String,
        required: [true, 'Debe indicar la descripcion del ToDo']
    },
    Completed: {
        type: Boolean,
        default: false
    },
    CreationDate: {
        type: Date,
        default: new Date()
    },
    UserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Debe indicar el usuario que creo la tarea"]
    },
    Criticality: {
        type: String,
        required: [true, "Debe indicar la criticidad del ToDo"]
    }
});
var CriticalityToDo;
(function (CriticalityToDo) {
    CriticalityToDo[CriticalityToDo["HIGH"] = 0] = "HIGH";
    CriticalityToDo[CriticalityToDo["MEDIUM"] = 1] = "MEDIUM";
    CriticalityToDo[CriticalityToDo["LOW"] = 2] = "LOW";
})(CriticalityToDo = exports.CriticalityToDo || (exports.CriticalityToDo = {}));
toDoSchema.method('toJSON', function () {
    var _a = this._doc, __v = _a.__v, data = __rest(_a, ["__v"]);
    return data;
});
exports.ToDo = mongoose_1.model('ToDo', toDoSchema);
