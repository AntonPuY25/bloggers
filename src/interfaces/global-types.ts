import {UsersType} from "./interfaces";

declare global {
     namespace Express {
        export interface Request {
            user: UsersType | null
        }
    }
}