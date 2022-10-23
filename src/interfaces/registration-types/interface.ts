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

export interface UserDataType {
    login: string,
    email: string,
    salt: string,
    password: string,
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