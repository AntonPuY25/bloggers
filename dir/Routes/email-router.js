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
exports.emailRouter = void 0;
const express_1 = require("express");
const email_service_1 = require("../domains/email-service");
exports.emailRouter = (0, express_1.Router)({});
exports.emailRouter
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, message, email } = req.body;
    const emailData = yield email_service_1.emailService.sendEmail({ email, message, subject });
    res.send(emailData);
}));
//# sourceMappingURL=email-router.js.map