import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'


function Login() {
    const [values, setValues] = useState({
        userid: '',
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
        const err = Validation(values)
        setErrors(err)
        navigate('/combined')
        // navigate('/users')
        if (err.userid === "" && err.password === "") {
            axios.post('http://localhost:8000/login', values)
                .then(res => {
                    console.log(res)
                    if (res.data === 'Success') { navigate('/home') } else { alert('No User Found')}
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rouded w-25'>
                {/* <h2></h2> */}
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        {/* <label htmlFor='userid'>USER ID</label> */}
                        <input type='text' placeholder='User Id' onChange={handleInput} className='form-control rounded-0' name='userid' />
                        {errors.userid && <span className='text-danger'>{errors.userid}</span>}
                    </div>
                    <div className='mb-3'>
                        {/* <label htmlFor='password'>Password</label> */}
                        <input type='password' placeholder='Password' onChange={handleInput} className='form-control rounded-0' name='password' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-warning w-100 rounded-0'><strong>LOGIN</strong> </button>
                    </div>
                    <div className='mb-3'>
                        <Link to='./Signup' className='btn btn-default border w-100 rounded-0 text-decoration-none'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login