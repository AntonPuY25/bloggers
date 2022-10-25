export interface RegistrationBodyTypes {
    login: string
    password: string
    email: string
}

export interface RegisterUserType {
    id: string,
    userData:UserDataType,
    emailConfirmation: EmailConfirmationType,
}

export interface UpdateUserType {
    id: string,
    code: string
}


export interface UserDataType {
    login: string,
    email: string,
    salt: string,
    password: string,
    deadRefreshTokens: string[],
}

export interface EmailConfirmationType {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean,
}

export interface RegistrationConfirmationBodyTypes {
    code: string
}

export interface RegistrationResendingEmailBodyTypes {
    email: string
}
export enum JWTTokenType {
    accessToken='accessToken',
    refreshToken='refreshToken',
}

export interface CreateJWTTokenType {
    user: RegisterUserType,
    expiresIn: string,
    type: JWTTokenType,
}
export interface GetRefreshJWTTokenType {
    refreshToken: string | {resultCode: number, data: {accessToken: string}},
    accessToken: string | {resultCode: number, data: {accessToken: string}}
}
