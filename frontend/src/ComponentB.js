// src/ComponentB.js
import React from 'react';
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from "react-router-dom"
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ComponentB = () => {
    const [users, setUsers] = useState([])
    const [filterRecords, setFilterRecords] = useState([])
    const navigate = useNavigate()

    const column = [
        {
            name: "User",
            selector: row => row.user,
            sortable: true
        },
        {
            name: "Email Id",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Role",
            selector: row => row.role,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Action",
            cell: row => (
                <div>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    {/* <button onClick={() => handleDelete(row)}>Delete</button> */}
                    <Link to={"/users/edit/" + row.id} className="btn btn-primary btn-sm m-1"><span className="bi bi-pen"></span></Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(row.id)}><span className="bi bi-trash3"></span></button>

                </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            button: "true",
        }
    ]


    const getUsers = () => {
        fetch("http://localhost:3001/users")
            .then((res) => {
                if (res.ok) { return res.json() }
                throw new Error()
            })
            .then((data) => {
                setUsers(data)
                setFilterRecords(data)
            })
            .catch((err) => { alert("Unable to get users") })
    }

    useEffect(getUsers, [])

    function deleteUser(id) {
        fetch("http://localhost:3001/users/" + id, {
            method: 'DELETE',

        }).then(res => {
            if (!res.ok) {
                throw new Error()
            }
            getUsers()
        }).catch(err => {
            alert("Unable to delete user")
        })

    }

    const handleFilter = (e) => {
        const newData = filterRecords.filter(row => row.user.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(newData)
    }

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(users);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Sheet1');
        writeFile(wb, 'DataTable.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = column.map(col => col.name);
        const tableRows = users.map(row => column.map(col => col.selector ? col.selector(row) : ''));
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });
        doc.save('DataTable.pdf');
    };

    function logout() {
        navigate('/')
    }
    return (
        <div>

            <div className="container mt-2" style={{ padding: "50px 10%" }}>

                {/* <div className="row mb-3">
                <div className="col">
                </div>
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/users/create" role="button">ADD NEW</Link>
                    <button className="btn btn-outline-primary" onClick={getUsers}>Refresh</button>
                </div>
            </div> */}

                <div style={{ display: 'flex', justifyContent: 'right' }}>

                    <DropdownButton id="dropdown-basic-button" title="Export" variant="info" className="me-3">
                        <Dropdown.Item as="button" onClick={exportToExcel}>Download Excel</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={exportToPDF}>Download PDF</Dropdown.Item>
                        <Dropdown.Item as="button">
                            <CSVLink data={users} className="dropdown-item">Download CSV</CSVLink>
                            {/* <CSVLink data={users} filename="DataTable.csv" className="dropdown-item">Download CSV</CSVLink> */}
                        </Dropdown.Item>
                    </DropdownButton>

                    {/* <CSVLink data={users} className="btn btn-default me-2">Download CSV</CSVLink>
                <button onClick={exportToExcel} className="btn btn-default me-2">Download Excel</button>
                <button onClick={exportToPDF} className="btn btn-default">Download PDF</button> */}

                    <input className="me-2 rounded" style={{ padding: "6px 10px" }} type="text" placeholder="Search..." onChange={handleFilter} />
                    <Link className="btn btn-warning me-2" to="/users/create" role="button">ADD NEW</Link>
                    <button className="btn btn-outline-info" onClick={getUsers}>Refresh</button>
                    <button className="btn btn-default" onClick={logout}><span className="bi bi-box-arrow-right"></span></button>


                </div>
                <DataTable customStyles={{
                    headRow: {
                        style: {
                            fontWeight: 'bold',
                            fontSize: '16px'
                        },
                    },
                }} columns={column} data={users} pagination selectableRows title="User Management">

                </DataTable>
            </div>
        </div>
    )
}

export default ComponentB;
