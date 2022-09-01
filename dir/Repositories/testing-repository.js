"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRepository = void 0;
const store_1 = require("../DB/store");
exports.testingRepository = {
    allClear: () => {
        store_1.posts.splice(0);
        store_1.bloggers.splice(0);
        return {
            success: true
        };
    }
};
//# sourceMappingURL=testing-repository.js.map