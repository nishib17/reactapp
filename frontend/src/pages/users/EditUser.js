import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ComponentA from '../../ComponentA';

export default function EditUser() {

    const params = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()

    function getUser() {
        fetch("http://localhost:3001/users/" + params.id)
            .then((res) => {
                if (res.ok) { return res.json() }

                throw new Error()
            })
            .then((data) => { setInitialData(data) })
            .catch((err) => { alert("Unable to Edit user") })
    }
    useEffect(getUser, [params.id])


    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries())
        //|| !user.img.name
        if (!user.user || !user.email || !user.role || !user.status ) {
            alert("Please fill all the fields.")
            return
        }

        try {
            const response = await fetch('http://localhost:3001/users/' + params.id, {
                method: 'PATCH',
                body: formData
            })
            const data = await response.json();

            if (response.ok) {
                // console.log('Success:', data);
                // navigate('/users')
                navigate('/combined')


            } else if (response.status === 400) {
                // alert("Validation Errors")
                setValidationErrors(data)
            } else {
                alert("Unable to edit user")
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
                <div className="col-md-8 mx-auto rounded border p-4 bg-white">
                    <h4 className="text-left mb-3">Edit User</h4>
                    {
                        initialData &&
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="id" defaultValue={params.id} />
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">User</label>
                                <div className="col-sm-8 ">
                                    <input type="text" className="form-control" name="user" defaultValue={initialData.user} />
                                    <span className="text-danger">{validationErrors.user}</span>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Email</label>
                                <div className="col-sm-8 ">
                                    <input type="text" className="form-control" name="email" defaultValue={initialData.email} />
                                    <span className="text-danger"></span>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Role</label>
                                <div className="col-sm-8 ">
                                    <select className="form-select" name="role" defaultValue={initialData.role}>
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                    <span className="text-danger"></span>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Status</label>
                                <div className="col-sm-8 ">
                                    <select className="form-select" name="status" defaultValue={initialData.status}>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                    <span className="text-danger"></span>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <div className="offset-sm-4 col-sm-8">
                                    <img src={"http://localhost:3001/images/" + initialData.imageFilename} width="150" alt="..." />
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
                    }
                </div>

            </div>

        </div>
        </div>
      </div>

        
    )
}