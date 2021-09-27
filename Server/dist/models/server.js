"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("../routes"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var Server = /** @class */ (function () {
    //Constructor whit the port application ->
    function Server(port) {
        this.port = port;
        // Initialized express ->
        this.app = express_1.default();
        this.config();
        this.setting();
        this.db_cnn();
    }
    Server.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        if (process.env.DEV == "true") {
            this.app.use(cors_1.default());
            // cors cofig ->
            this.app.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', "*");
                res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }
        this.app.use('/', routes_1.default);
    };
    // set the port ->
    Server.prototype.setting = function () {
        this.app.set('port', this.port || process.env.PORT);
    };
    // Running the server ->
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server running on port: " + _this.port);
        });
    };
    Server.prototype.db_cnn = function () {
        //Conectar a la Db
        mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING || '', {}, function (err) {
            if (err)
                throw err;
            console.log('Conected to MongoDb');
        });
    };
    return Server;
}());
exports.default = Server;
