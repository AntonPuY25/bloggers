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
describe('/blogs', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app).delete('/testing/all-data');
    }));
    let currentBlog = null;
    it('Should create a new blogger', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .post('/blogs')
            .send({
            "name": "Bob",
            "youtubeUrl": "https://youtoube.com"
        })
            .expect(201);
        currentBlog = result.body;
        expect(result.body.name).toEqual("Bob");
        expect(result.body.youtubeUrl).toEqual("https://youtoube.com");
    }));
    it('should get created blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .get('/blogs')
            .expect(200);
        expect(result.body.items).toHaveLength(1);
    }));
    it('Should get current blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .get(`/blogs/${currentBlog.id}`)
            .expect(200);
        expect(result.body.name).toEqual(currentBlog.name);
        expect(result.body.youtubeUrl).toEqual(currentBlog.youtubeUrl);
    }));
    it('Should update current blog', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .put(`/blogs/${currentBlog.id}`)
            .send({
            "name": "Anton 3.0",
            "youtubeUrl": "https://youtoube2.0.com"
        })
            .expect(204);
        const result = yield (0, supertest_1.default)(index_1.app)
            .get(`/blogs/${currentBlog.id}`)
            .expect(200);
        expect(result.body.name).toEqual('Anton 3.0');
        expect(result.body.youtubeUrl).toEqual('https://youtoube2.0.com');
    }));
    it('Should create post for current blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .post(`/blogs/${currentBlog.id}/posts`)
            .send({
            "title": "This new Post 123",
            "shortDescription": "AAAAAAAAAAAAAAAAAAAA",
            "content": "No content"
        })
            .expect(201);
        expect(result.body.title).toEqual('This new Post 123');
        expect(result.body.shortDescription).toEqual('AAAAAAAAAAAAAAAAAAAA');
        expect(result.body.content).toEqual('No content');
        expect(result.body.blogId).toEqual(currentBlog.id);
    }));
    it('Should get posts for current blog', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .get(`/blogs/${currentBlog.id}/posts`)
            .expect(200);
        console.log(result.body, 'result');
        expect(result.body.items[0].title).toEqual('This new Post 123');
        expect(result.body.items[0].blogId).toEqual(currentBlog.id);
    }));
    it('Should delete current blog', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .delete(`/blogs/${currentBlog.id}`)
            .expect(204);
        const result = yield (0, supertest_1.default)(index_1.app)
            .get('/blogs')
            .expect(200);
        expect(result.body.items).toHaveLength(0);
    }));
});
//# sourceMappingURL=bloggers.api.test.js.map