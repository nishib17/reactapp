import React from 'react';
import { Link, useNavigate } from "react-router-dom"

const ComponentA = () => {
    const navigate = useNavigate()

    function logout() {
        navigate('/')
    }
    return (

        <div className='text-white'>
            <nav className="navbar bg-info border-bottom box-shadow">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="/combined">Dashboard</a> */}
                    <Link to="/combined" className="navbar-brand text-white">Dashboard</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li> */}
                            {/* <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li> */}
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                                    Management
                                </span>
                                <ul className="dropdown-menu">
                                    <li><Link to="/combined" className="dropdown-item">User List</Link>
                                    </li>


                                    <li><Link to="/users/create" className="dropdown-item">Add New</Link>
                                    </li>

                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled text-white" aria-disabled="true">Admin</a>
                            </li>

                            <li className="nav-item navbar-brand text-white">
                                A
                            </li>
                            <li className="nav-item navbar-brand text-white">
                                Manual Data Upload
                            </li>
                            <li className="nav-item navbar-brand text-white">
                                Custom Fields
                            </li>
                            <li className="nav-item ">
                                <button className="btn btn-default" onClick={logout}><span className="bi bi-box-arrow-right"></span></button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default ComponentA;