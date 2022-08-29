export const getCurrentFieldError = (field:string,message:string) =>{
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    }
}