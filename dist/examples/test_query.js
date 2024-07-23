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
// index.ts
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const entity_1 = require("./entity");
const createUser_dto_1 = require("./createUser.dto");
// Example usage
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize the DataSource
    const dt = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'sandbox_nest',
        synchronize: true,
        entities: [entity_1.User],
    });
    yield dt.initialize();
    // const user = new CreateUserDto();
    // user.name = 'Khairul Rahadian';
    // user.email = 'khairul.rahadian@gmail.com';
    // user.address = 'Ujung Berung';
    // user.age = 25;
    // user.password = 'securepassword';
    // const tableName = 'users';
    // console.log(user);
    // const insertWithHeap = await CryptoTs.insertWithHeap(dt, tableName, user);
    // console.log('Insert With Heap:', insertWithHeap);
    // const updateUser = new UpdateUserDto();
    // updateUser.name = 'Reka Alamsyah sadsadas paham'; // Update name to a new value
    // updateUser.email = 'reka.alamsyah.updateasdasdsa@gmail.com'; // Update email to a new value
    // updateUser.address = 'Cisereuh aseeemmm';
    // updateUser.age = 30;
    // updateUser.password = 'securepassword';
    // const updateWithHeap = await CryptoTs.updateWithHeap(dt, tableName, updateUser, '4207c94f-4f08-4793-90fa-6b5ceacadf00');
    // console.log('Update With Heap:', updateWithHeap);
    const user = new createUser_dto_1.CreateUserDto();
    user.name = 'Dyaksa Rahadian';
    user.email = 'dyaksa.rahadian@gmail.com';
    user.address = 'Demak Berung';
    user.age = 25;
    user.password = 'securepassword';
    const saveToHeap = yield index_1.default.buildBlindIndex(dt, user);
    console.log('Insert With Heap :', saveToHeap);
});
main();
