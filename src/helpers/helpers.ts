import bcrypt from "bcrypt";

export const getCurrentFieldError = (field: string, message: string) => {
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    }
}

export const getGeneratedHashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password , salt)

}

