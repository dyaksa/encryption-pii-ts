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
const index_1 = require("../index");
function exampleGetHeapsByFullContent() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputValue = "ali.farhan160@yopmail.com";
            const splitValue = index_1.default.split(inputValue);
            const result = yield index_1.default.searchContentFullText('email_text_heap', { contents: splitValue });
            console.log('Result:', result);
        }
        catch (error) {
            console.error('Error fetching heaps by content:', error);
        }
    });
}
exampleGetHeapsByFullContent();
