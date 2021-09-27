"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCompleteToDo = exports.validCriticalityToDo = exports.existToDo = exports.craeteUserValidator = exports.tokenValidator = exports.BodyValidator = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var toDo_1 = require("../models/toDo");
var usuario_1 = require("../models/usuario");
var BodyValidator = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            ok: false,
            errors: errors.array()
        });
    }
    next();
};
exports.BodyValidator = BodyValidator;
var tokenValidator = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.header('x-token');
                console.log(req.headers);
                if (!token) {
                    return [2 /*return*/, res.status(401).json()];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY_JWT || "RANDOM_KEY");
                decoded = decoded;
                if (!(decoded === null || decoded === void 0 ? void 0 : decoded.Email)) {
                    return [2 /*return*/, res.status(401).json()];
                }
                return [4 /*yield*/, usuario_1.User.findOne({ Email: decoded.Email })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json()];
                }
                req.body.User = user;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(401).json()];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.tokenValidator = tokenValidator;
var craeteUserValidator = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, UserName, Email, Password, PasswordRepeat, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, UserName = _a.UserName, Email = _a.Email, Password = _a.Password, PasswordRepeat = _a.PasswordRepeat;
                if (Password !== PasswordRepeat) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: 'Las contrasenas no coinciden.'
                        })];
                }
                return [4 /*yield*/, usuario_1.User.findOne({ Email: Email })];
            case 1:
                if (!!(_b.sent())) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: 'Ya existe un usuario con el email: ' + Email
                        })];
                }
                return [4 /*yield*/, usuario_1.User.findOne({ UserName: UserName })];
            case 2:
                if (!!(_b.sent())) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: 'Ya existe un usuario con el nombre de usuario: ' + UserName
                        })];
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json(error_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.craeteUserValidator = craeteUserValidator;
var existToDo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, toDo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, toDo_1.ToDo.findById(id)];
            case 2:
                toDo = _a.sent();
                if (!toDo) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            err: 'El toDo no existe.'
                        })];
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.json({
                        ok: false,
                        err: error_3.message
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.existToDo = existToDo;
var validCriticalityToDo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Criticality;
    return __generator(this, function (_a) {
        Criticality = req.body.Criticality;
        if (Criticality != 0 && Criticality != 1 && Criticality != 2) {
            return [2 /*return*/, res.json({
                    ok: false,
                    err: "Debe indicar una criticidad validad para el todo. 0: " + toDo_1.CriticalityToDo[0] + ", 1: " + toDo_1.CriticalityToDo[1] + ", 2: " + toDo_1.CriticalityToDo[2]
                })];
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.validCriticalityToDo = validCriticalityToDo;
var validCompleteToDo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, toDo_1.ToDo.findById(id)];
            case 1:
                todo = _a.sent();
                console.log(todo);
                if (!todo || todo.Completed) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: "Debe indicar un valido para el cambio de estado."
                        })];
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.validCompleteToDo = validCompleteToDo;
