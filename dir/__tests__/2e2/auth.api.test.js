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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
describe('/auth', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app).delete('/testing/all-data');
    }));
    let currentUser = null;
    it('should create a new user with correct Data', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .post('/users')
            .send({
            "login": "puy25",
            "email": "puy25@bk.ru",
            "password": "123123"
        })
            .expect(201);
        expect(result.body.email).toEqual("puy25@bk.ru");
        expect(result.body.login).toEqual("puy25");
        expect(result.body.id).toBeDefined();
        currentUser = result.body;
    }));
    it('should auth a created user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .post('/auth/login')
            .send({
            "login": "puy25",
            "password": "123123"
        })
            .expect(200);
    }));
});
//# sourceMappingURL=auth.api.test.js.map