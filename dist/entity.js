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
exports.Entity = void 0;
// entity.ts
const decorator_1 = require("./decorator");
class Entity {
}
exports.Entity = Entity;
__decorate([
    (0, decorator_1.DBColumn)('id'),
    __metadata("design:type", String)
], Entity.prototype, "id", void 0);
__decorate([
    (0, decorator_1.DBColumn)('name'),
    __metadata("design:type", String)
], Entity.prototype, "name", void 0);
__decorate([
    (0, decorator_1.DBColumn)('created_at'),
    __metadata("design:type", String)
], Entity.prototype, "createdAt", void 0);
__decorate([
    (0, decorator_1.DBColumn)('age'),
    __metadata("design:type", Number)
], Entity.prototype, "age", void 0);
__decorate([
    (0, decorator_1.DBColumn)('score'),
    __metadata("design:type", Number)
], Entity.prototype, "score", void 0);
__decorate([
    (0, decorator_1.DBColumn)('is_active'),
    __metadata("design:type", Boolean)
], Entity.prototype, "isActive", void 0);
__decorate([
    (0, decorator_1.DBColumn)('content'),
    (0, decorator_1.BidxCol)('bidx_content'),
    (0, decorator_1.TxtHeapTable)('example_heap'),
    __metadata("design:type", String)
], Entity.prototype, "content", void 0);
