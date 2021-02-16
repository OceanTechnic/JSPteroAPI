"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRequest_1 = __importDefault(require("../ClientRequest"));
/**
 * @param {String} serverId ID of the server to get (In the settings tab of server/in link)
 */
async function getWebsocketAuthData(serverId) {
    const Req = new ClientRequest_1.default(process.env.ClientHost, process.env.ClientKey);
    return Req.request('getWebsocketAuthData', 'GET', null, 'data', `/api/client/servers/${serverId}/websocket`, false);
}
exports.default = getWebsocketAuthData;