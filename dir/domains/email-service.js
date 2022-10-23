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
exports.emailService = void 0;
const email_adapter_1 = require("../adapters/email-adapter");
const email_manager_1 = require("../managers/email-manager");
exports.emailService = {
    sendEmail({ email, subject, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            const recoveryData = yield email_manager_1.emailManager.getRecoveryMessageEmail({
                id: '1',
                userData: { email, salt: '123', login: 'PuY', password: '123' },
                emailConfirmation: { confirmationCode: '13sd', isConfirmed: false, expirationDate: new Date() }
            });
            return yield email_adapter_1.emailAdapter.sendEmail(recoveryData);
        });
    }
};
//# sourceMappingURL=email-service.js.map