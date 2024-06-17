function ValidationNew(values){
    let error = {}
    let password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

    if(values.user === ""){
        error.user = "User Should not be empty"
    }else{
        error.user =""
    }

    if(values.password === ""){
        error.password = "Password Should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password Didn't Match"

    }else{
        error.password =""
    }
    return error

}

export default ValidationNew