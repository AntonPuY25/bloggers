import {RegisterUserType} from "./registration-types/interface";

declare global {
     namespace Express {
        export interface Request {
            user: RegisterUserType | null
        }
    }
}