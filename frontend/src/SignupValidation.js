function Validation(values){
    let error = {}
    let password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

    if(values.name === ""){
        error.name = "Name Should not be empty"
    }else{
        error.name =""
    }

    if(values.userid === ""){
        error.userid = "Userid Should not be empty"
    }else{
        error.userid =""
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

export default Validation