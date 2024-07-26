"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const user_entity_1 = require("./user_entity");
function exampleGetHeapsByContent() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize the DataSource
        const dt = new typeorm_1.DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mysecretpassword',
            database: 'sandbox_nest',
            synchronize: true,
            entities: [user_entity_1.User],
        });
        yield dt.initialize();
        try {
            const inputValue = "dian";
            const result = yield index_1.default.searchContents(dt, 'name_text_heap', { content: inputValue });
            console.log('Result:', result);
        }
        catch (error) {
            console.error('Error fetching heaps by content:', error);
        }
    });
}
exampleGetHeapsByContent();
