"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorEvents = monitorEvents;
const file_1 = require("../handlers/file");
const messageRouter_1 = require("./messageRouter");
function monitorEvents() {
    messageRouter_1.router.register({ type: "select-file", payload: {} }, file_1.openFile);
}
//# sourceMappingURL=messges.js.map