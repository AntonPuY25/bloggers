"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = require("express");
const testing_repository_1 = require("../Repositories/testing-repository");
exports.testingRoute = (0, express_1.Router)({});
exports.testingRoute.delete('/all-data', (req, res) => {
    const { success } = testing_repository_1.testingRepository.allClear();
    if (success) {
        res.sendStatus(204);
    }
});
//# sourceMappingURL=testing-route.js.map