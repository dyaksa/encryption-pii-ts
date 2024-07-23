"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// entity.ts
const index_1 = require("../index");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    index_1.default.DBColumn('id'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea'),
    index_1.default.DBColumn('name'),
    index_1.default.BidxCol('bidx_name'),
    index_1.default.TxtHeapTable('name_text_heap'),
    __metadata("design:type", Buffer)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name_bidx", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea'),
    index_1.default.DBColumn('email'),
    index_1.default.BidxCol('bidx_email'),
    index_1.default.TxtHeapTable('email_text_heap'),
    __metadata("design:type", Buffer)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email_bidx", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea'),
    index_1.default.DBColumn('address'),
    index_1.default.BidxCol('bidx_address'),
    index_1.default.TxtHeapTable('address_text_heap'),
    __metadata("design:type", Buffer)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address_bidx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 25 }) // Define 'age' column as nullable
    ,
    index_1.default.DBColumn('age'),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    index_1.default.DBColumn('password'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
