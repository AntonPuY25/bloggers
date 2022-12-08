export interface RegistrationBodyTypes {
    login: string
    password: string
    email: string
}

export interface RegisterUserType {
    id: string,
    userData:UserDataType,
    emailConfirmation: EmailConfirmationType,
    createdAt?: string,
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
    expirationDate: Date | string,
    isConfirmed: boolean,
}

export interface RegistrationConfirmationBodyTypes {
    code: string
}

export interface RegistrationResendingEmailBodyTypes {
    email: string
}

export interface FindBySaltUserTypes {
    password: string
}

export interface UpdateCurrentUserSaltType {
    id: string
    passwordHash: string;
    passwordSalt: string;
}


export enum JWTTokenType {
    accessToken='accessToken',
    refreshToken='refreshToken',
}

export enum JWTTokenMethodType {
    create,
    update,
}

export interface CreateJWTTokenType {
    user: RegisterUserType,
    expiresIn: string,
    type: JWTTokenType,
    deviceId: string;
    methodType: JWTTokenMethodType;
    device?: string;
    ip?: string;
}
export interface GetRefreshJWTTokenType {
    refreshToken: string,
    accessToken: string
}

export interface CreateTokensProps {
    issueAt: string;
    deviceId: string;
    finishedDate: string;
    userId: string;
    ip?: string;
    deviceName?: string;
}

export interface GetUserItByDeviceIDProps {
    deviceId: string;
    issueAt: string
}

export interface UpdateTokenByIdProps {
  token:CreateTokensProps
}
