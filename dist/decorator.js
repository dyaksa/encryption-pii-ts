"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBColumn = DBColumn;
exports.BidxCol = BidxCol;
exports.TxtHeapTable = TxtHeapTable;
// decorators.ts
function DBColumn(columnName) {
    return (target, propertyKey) => {
        Reflect.defineMetadata('db', columnName, target, propertyKey);
    };
}
function BidxCol(columnName) {
    return (target, propertyKey) => {
        Reflect.defineMetadata('bidx_col', columnName, target, propertyKey);
    };
}
function TxtHeapTable(tableName) {
    return (target, propertyKey) => {
        Reflect.defineMetadata('txt_heap_table', tableName, target, propertyKey);
    };
}
