import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ValidationNew from './SignupValidationNew'
// import axios from 'axios'

function SignupNew() {
    const [values, setValues] = useState({
        user:'',
        email : '',
        password :''
       })
    
       const navigate = useNavigate()
       const [errors, setErrors] = useState({})
    
       const handleInput = (event) => {
         setValues((prev)=> ({
            ...prev, [event.target.name] : [event.target.value]
         }))
        
       }
    
       const handleSubmit = async (event) => {
        event.preventDefault()
        const err = ValidationNew(values)
        setErrors(err)
        if(err.user === "" && err.email === "" && err.password === ""){
            const formData = new FormData(event.target)
            const response = await fetch('http://localhost:3001/users',{
                method:'POST',
                body : formData
            })
            // const data = await response.json(); 
            if (response.ok) {
                // const data = await response.json(); 
                // navigate('/users')
                navigate('/')
            }else
            {
                alert("Unable to Register")
                console.error('Error:', response.statusText);
            }
        }
       
      }
    return (
        <div className="row backimg">
        <div className="col-md-3">

            
        </div>
        <div className="col-md-9">
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rouded w-25'>
                <h4 className='text-center p-1'>Sign In</h4>
                <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                        {/* <label htmlFor='name'>name</label> */}
                        <input type='text' placeholder='User Id' onChange={handleInput} className='form-control rounded-0' name='user' />
                        {errors.user && <span className='text-danger'>{errors.user}</span>}
                    </div>
                    <div className='mb-3'>
                        {/* <label htmlFor='userid'>USER ID</label> */}
                        <input type='text' placeholder='Email' onChange={handleInput} className='form-control rounded-0' name='email' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
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
        </div>
        </div>
    )
}

export default SignupNew