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
    return await bcrypt.hash('12345' , '$2a$10$r3ZkRK.LvdRbbW26VFzZ8.')

}