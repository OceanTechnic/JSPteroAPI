"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const Error_1 = __importDefault(require("../modules/Error"));
class Request {
    constructor(host, key) {
        this.host = host;
        this.key = key;
    }
    /**
     * @param requestType - The type of request to use e. g. GET, POST
     * @param data - Data to send
     * @param dataObj - Data object to return / Text to give on success
     * @param endpoint - Endpoint for server to call
     */
    async request(requestType, data, dataObj, endpoint) {
        const URL = this.host + endpoint;
        const options = {
            method: requestType,
            headers: {
                'responseEncoding': 'utf8',
                'Authorization': 'Bearer ' + this.key,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        if (data)
            options.body = JSON.stringify(data);
        const rawData = await node_fetch_1.default(URL, options);
        if (!rawData.ok)
            throw new Error_1.default(rawData, await rawData.json(), data, requestType);
        if (rawData.status == 204)
            return dataObj;
        const res = await rawData.json();
        switch (dataObj) {
            case 'data':
                return res.data;
            case 'attributes':
                return res.attributes;
            default:
                return res;
        }
    }
}
exports.default = Request;
