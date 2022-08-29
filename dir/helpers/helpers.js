"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentFieldError = void 0;
const getCurrentFieldError = (field, message) => {
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    };
};
exports.getCurrentFieldError = getCurrentFieldError;
//# sourceMappingURL=helpers.js.map