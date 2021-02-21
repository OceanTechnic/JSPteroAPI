"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationRequest_1 = __importDefault(require("../ApplicationRequest"));
const Functions_1 = __importDefault(require("../../modules/Functions"));
class allocationMethods {
    constructor(host, key) {
        this.host = host;
        this.key = key;
        /**
         * @param nodeId - The node id of which you want to get allocations from
         * @param options - Include information about relationships
         * @returns Returns information about node
         * @example
         * ```ts
         * const res = await app.getAllAllocations(1) // res = NodeAttributes
         * ```
         * @example
         * ```ts
         * app.getAllAllocations(1).then((res) => console.log(res)) // res = NodeAttributes
         * ```
         */
        this.getAllAllocations = async (nodeId, options) => {
            return new ApplicationRequest_1.default(this.host, this.key).request('GET', null, 'data', `/api/application/nodes/${nodeId}/allocations${Functions_1.default(options)}`);
        };
        /**
         * @param nodeId - The node id of which you want to create allocations
         * @param ip - IP for the allocation
         * @param ports - Ports array to add
         * @param alias - The alias for this allocation
         * @returns If successful returns Successfully created!
         * @example
         * ```ts
         * const res = await app.createAllocation(1, undefined, ['25565']) // res = Successfully created!
         * ```
         * @example
         * ```ts
         * app.createAllocation(1, undefined, ['25565'], 'minecraft').then((res) => console.log(res)) // res = Successfully created!
         * ```
         */
        this.createAllocation = async (nodeId, ip = '0.0.0.0', ports, alias = '') => {
            return new ApplicationRequest_1.default(this.host, this.key).request('POST', {
                ip: ip,
                ports: ports,
                allocation_alias: alias,
            }, 'Successfully created!', `/api/application/nodes/${nodeId}/allocations`);
        };
        /**
         * @param nodeId - The node id of which you want to delete allocation
         * @param allocationId - The id of allocation to delete
         * @returns If successful returns Successfully deleted!
         * @example
         * ```ts
         * const res = await app.deleteAllocation(1, 5) // res = Successfully deleted!
         * ```
         * @example
         * ```ts
         * app.deleteAllocation(1, 8).then((res) => console.log(res)) // res = Successfully deleted!
         * ```
         */
        this.deleteAllocation = async (nodeId, allocationId) => {
            return new ApplicationRequest_1.default(this.host, this.key).request('DELETE', null, 'Successfully deleted!', `/api/application/nodes/${nodeId}/allocations/${allocationId}`);
        };
    }
}
exports.default = allocationMethods;
