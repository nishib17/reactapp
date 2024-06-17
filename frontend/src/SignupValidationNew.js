function ValidationNew(values){
    let error = {}
    let password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    var email_pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if(values.user === ""){
        error.user = "User Should not be empty"
    }else{
        error.user =""
    }

    if(values.email === ""){
        error.email = "Email Should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email Id Not Proper"
    }else{
        error.email =""
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