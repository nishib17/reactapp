import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ComponentA from '../../ComponentA';

export default function CreateUser() {

    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries())
        // || !user.img.name
        if (!user.user || !user.email || !user.role || !user.status ) {
            alert("Please fill all the fields.")
            return
        }

        try {
            const response = await fetch('http://localhost:3001/users',{
                method:'POST',
                body : formData
            })
            const data = await response.json(); 
            if (response.ok) {
                // const data = await response.json(); 
                // console.log('Success:', data);
                // navigate('/users')
                // navigate('/dashboard')
                navigate('/combined')


            }else if(response.status === 400){
                // alert("Validation Errors")
                setValidationErrors(data)
            }else
            {
                alert("Unable to create user")
                console.error('Error:', response.statusText);
            }

        } catch (error) {
            alert("Unable to connect Server")
        }

    }
    return (
        <div className="combined-container">
        <div className="component component-a">
          <ComponentA />
        </div>
        <div className="component component-b">
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">User</label>
                            <div className="col-sm-8 ">
                                <input type="text" className="form-control" name="user" />
                                <span className="text-danger">{validationErrors.user}</span>
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8 ">
                                <input type="text" className="form-control" name="email" />
                                <span className="text-danger"></span>
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Role</label>
                            <div className="col-sm-8 ">
                                <select className="form-select" name="role">
                                    <option>Admin</option>
                                    <option>User</option>
                                </select>
                                <span className="text-danger"></span>
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Status</label>
                            <div className="col-sm-8 ">
                                <select className="form-select" name="status">
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <span className="text-danger"></span>
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8 ">
                                <input type="file" className="form-control" name="img" />
                                <span className="text-danger"></span>
                            </div>

                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to="/combined" role="button"> Cancel</Link>
                            </div>

                        </div>

                    </form>
                </div>

            </div>

        </div>
        </div>
      </div>

        
    )
}