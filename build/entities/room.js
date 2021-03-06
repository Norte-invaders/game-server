"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Room = class Room {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Room.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', unique: true })
], Room.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', unique: true, name: 'join_code' })
], Room.prototype, "joinCode", void 0);
__decorate([
    typeorm_1.Column({ type: 'integer', name: 'max_participants' })
], Room.prototype, "maxParticipants", void 0);
Room = __decorate([
    typeorm_1.Entity('rooms')
], Room);
exports.default = Room;
