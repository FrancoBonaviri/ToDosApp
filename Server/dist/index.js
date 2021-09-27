"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./models/server"));
var main = function () {
    var app = new server_1.default(4500);
    app.listen();
};
// play ->
main();
