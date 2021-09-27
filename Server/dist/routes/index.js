"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var toDo_1 = __importDefault(require("./toDo"));
var usuario_1 = __importDefault(require("./usuario"));
var routes = express_1.Router();
routes.use('/usuario', usuario_1.default);
routes.use('/todos', toDo_1.default);
exports.default = routes;
