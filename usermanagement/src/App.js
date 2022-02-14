import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import Login from './components/authComponent/Login';
import NewUser from './components/newUser/NewUser';
import UserDetails from './components/userDetails/UserDetails';
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch';
import CreatePassword from "./components/authComponent/CreatePassword";

function App() {
  const navigate = useNavigate();
  

  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<NewUser />} />
        <Route exact path="createpassword/:userId" element={<CreatePassword />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;