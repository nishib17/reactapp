import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function UsersList() {

    const [users, setUsers] = useState([])

    function getUsers() {
        fetch("http://localhost:3001/users")
            .then((res) => {
                if (res.ok) { return res.json() }
                throw new Error()
            })
            .then((data) => { setUsers(data) })
            .catch((err) => { alert("Unable to get users") })
    }

    useEffect (getUsers, [])

    function deleteUser(id){
        fetch("http://localhost:3001/users/" + id,{
            method : 'DELETE',

        }).then(res => {
            if(!res.ok){
                throw new Error()
            }
            getUsers()
        }).catch(err => {
            alert("Unable to delete user")
        })

    }

   

    return (
        <div className="container my-4">
            <h2 className="text-left mb-4"> User Management</h2>

            <div className="row mb-3">
                <div className="col">
                    
                </div>
                <div className="col">
                <Link className="btn btn-primary me-1" to="/users/create" role="button">ADD NEW</Link>
                    <button className="btn btn-outline-primary" onClick={getUsers}>Refresh</button>
                </div>

            </div>
            
            <table  class="table table-striped">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email Id</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.user}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                        <Link to={"/users/edit/"+ user.id} className="btn btn-primary btn-sm me-1">Edit</Link>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersList