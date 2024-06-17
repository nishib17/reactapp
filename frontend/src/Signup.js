import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'


function Signup() {
    const [values, setValues] = useState({
        name:'',
        userid : '',
        password :''
       })
    
       const navigate = useNavigate()
       const [errors, setErrors] = useState({})
    
       const handleInput = (event) => {
         setValues((prev)=> ({
            ...prev, [event.target.name] : [event.target.value]
         }))
        
       }
    
       const handleSubmit = (event) => {
        event.preventDefault()
        const err = Validation(values)
        setErrors(err)
        if(err.name === "" && err.userid === "" && err.password === ""){
            axios.post('http://localhost:8000/signup',values)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => console.log(err))
        }
       
      }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rouded w-25'>
                <h2>Sign</h2>
                <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                        {/* <label htmlFor='name'>name</label> */}
                        <input type='text' placeholder='Name' onChange={handleInput} className='form-control rounded-0' name='name' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        {/* <label htmlFor='userid'>USER ID</label> */}
                        <input type='text' placeholder='User Id' onChange={handleInput} className='form-control rounded-0' name='userid' />
                        {errors.userid && <span className='text-danger'>{errors.userid}</span>}
                    </div>
                    <div className='mb-3'>
                        {/* <label htmlFor='password'>Password</label> */}
                        <input type='password' placeholder='Password' onChange={handleInput}  className='form-control rounded-0' name='password' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-warning w-100 rounded-0'><strong>Sign Up</strong> </button>
                    </div>
                    <div className='mb-3'>
                        <Link to='/' className='btn btn-default border w-100 rounded-0 text-decoration-none'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup