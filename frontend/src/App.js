import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react";

import './App.css';
// Import components
// import Login from './Login';
// import Signup from './Signup';
import LoginNew from './LoginNew';
import SignupNew from './SignupNew';
// import Navbar from './Navbar';
// import Dashboard from './Dashboard';
import UsersList from './pages/users/UsersList';
import CreateUser from './pages/users/CreateUser';
import EditUser from './pages/users/EditUser';
import CombinedPage from './CombinedPage';

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'aliceblue'; // Replace 'lightgray' with any color you prefer
  }, []);
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/' element={<LoginNew></LoginNew>}></Route>
        {/* <Route path='/' element={<Login></Login>}></Route> */}
        {/* <Route path='/signup' element={<Signup></Signup>}></Route> */}
        <Route path='/signupnew' element={<SignupNew></SignupNew>}></Route>
        {/* <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route> */}
        <Route path='/users' element={<UsersList></UsersList>}></Route>
        <Route path='/users/create' element={<CreateUser></CreateUser>}></Route>
        <Route path='/users/edit/:id' element={<EditUser></EditUser>}></Route>
        <Route path="/combined" element={<CombinedPage />} />
      </Routes>
      {/* <Navbar></Navbar> */}
      {/* <Dashboard></Dashboard> */}
    </BrowserRouter>
  );
}

export default App;
