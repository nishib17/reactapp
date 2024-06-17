import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ValidationNew from './LoginValidationNew'
import axios from 'axios'


function LoginNew() {
    const [values, setValues] = useState({
        user: '',
        password: ''
    })

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev, [event.target.name]: [event.target.value]
        }))

    }

    const handleSubmit = (event) => {

        event.preventDefault()
        const err = ValidationNew(values)
        setErrors(err)
    
        // navigate('/users')
        if (err.user === "" && err.password === "") {
            axios.get('http://localhost:3001/users')
                .then(res => {
                    let userData = {}
                    if(res.data.length > 0){
                        userData = res.data.find(u => String(u.user) === String(values.user) && String(u.password) === String(values.password) )
                        if(userData){
                            navigate('/combined')
                        }else{
                            alert('UserName or Password is wrong')
                        }
                    }else{
                        console.log('No Data found')
                    }
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className="row backimg">
        <div className="col-md-3">

            
        </div>
        <div className="col-md-9">

            <div className='d-flex justify-content-center align-items-center  vh-100'>
                <div className='bg-white p-3 rouded w-24'>
                    <h4 className='text-center p-1'>Hyundai Safety Analytics</h4>
                    <form action='' onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            {/* <label htmlFor='user'>USER ID</label> */}
                            <input type='text' placeholder='USER ID' onChange={handleInput} className='form-control rounded-0' name='user' />
                            {errors.user && <span className='text-danger'>{errors.user}</span>}
                        </div>
                        <div className='mb-3'>
                            {/* <label htmlFor='password'>Password</label> */}
                            <input type='password' placeholder='PASSWORD' onChange={handleInput} className='form-control rounded-0' name='password' />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='btn btn-warning w-100 rounded-0'><strong>LOGIN</strong> </button>
                        </div>
                        <div className='mb-3'>
                            <Link to='./SignupNew' className='btn btn-default border w-100 rounded-0 text-decoration-none'>Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default LoginNew