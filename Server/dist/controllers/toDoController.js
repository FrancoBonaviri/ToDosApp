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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoController = void 0;
var toDo_1 = require("../models/toDo");
var ToDoController = /** @class */ (function () {
    function ToDoController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var toDos, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, toDo_1.ToDo.find({ Completed: false })];
                    case 1:
                        toDos = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: true,
                                ToDos: toDos
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: error_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAllAnteriores = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var toDos, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, toDo_1.ToDo.find({ Completed: true })];
                    case 1:
                        toDos = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: true,
                                ToDos: toDos
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: error_2.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.craete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, Name, Description, LimitDate, Criticality, toDo, toDoDB, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, Name = _a.Name, Description = _a.Description, LimitDate = _a.LimitDate, Criticality = _a.Criticality;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        toDo = {
                            Name: Name,
                            Description: Description,
                            Completed: false,
                            CreationDate: new Date(),
                            LimitDate: LimitDate,
                            User: req.body.User.id,
                            Criticality: Criticality,
                        };
                        return [4 /*yield*/, toDo_1.ToDo.create(toDo)];
                    case 2:
                        toDoDB = _b.sent();
                        return [2 /*return*/, res.json({
                                ok: true,
                                ToDo: toDoDB
                            })];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: error_3.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.markAsDone = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, toDoDB, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, toDo_1.ToDo.findByIdAndUpdate(id, { Completed: true, CompletedDate: new Date() }, { new: true })];
                    case 2:
                        toDoDB = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: true,
                                ToDo: toDoDB
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: error_4.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, toDo_1.ToDo.findByIdAndDelete(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                ok: true,
                                message: 'El toDo fue eliminado correctamente'
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.json({
                                ok: false,
                                err: error_5.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return ToDoController;
}());
exports.toDoController = new ToDoController();
