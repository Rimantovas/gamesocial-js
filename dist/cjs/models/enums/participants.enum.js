"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantMissionStatus = exports.ParticipantTaskStatus = void 0;
var ParticipantTaskStatus;
(function (ParticipantTaskStatus) {
    ParticipantTaskStatus["created"] = "created";
    ParticipantTaskStatus["pending"] = "pending";
    ParticipantTaskStatus["completed"] = "completed";
    ParticipantTaskStatus["failed"] = "failed";
})(ParticipantTaskStatus || (exports.ParticipantTaskStatus = ParticipantTaskStatus = {}));
var ParticipantMissionStatus;
(function (ParticipantMissionStatus) {
    ParticipantMissionStatus["created"] = "created";
    ParticipantMissionStatus["started"] = "started";
    ParticipantMissionStatus["completed"] = "completed";
    ParticipantMissionStatus["failed"] = "failed";
})(ParticipantMissionStatus || (exports.ParticipantMissionStatus = ParticipantMissionStatus = {}));
//# sourceMappingURL=participants.enum.js.map