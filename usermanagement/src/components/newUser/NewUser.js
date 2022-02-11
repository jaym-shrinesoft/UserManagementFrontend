import React from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function NewUser() {
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, selRole] = useState("Level 1")
    const [error, setError] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    const addUser = (e) => {
        e.preventDefault();
        const user = {
            userName: username,
            fullName: fullName,
            password: password,
            emailAddress: email,
            role: {
                roleName: role
            }
        }
        axios.post(`${api_key}/users/create`, user)
            .then(response => {
                if (response.data === "Duplicate") {
                    setError("username or email already exists")
                    setTimeout(() => {
                        setError(null)
                    }, 2000);
                }
                else {
                    if (!localStorage.getItem("userId")) {
                        setError("Registration successful, Redirecting to Login page")
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                    }
                    else {
                        setError("Registration successful, Redirecting to Userpage")
                        setTimeout(() => {
                            navigate("/");
                        }, 2000);
                    }
                }
            });
    }
    useEffect(() => {
        if (localStorage.getItem("role") === "Level 1") {
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);

    return <div>
        <Container className='d-flex justify-content-center'>
            <Form className='py-3 px-4 my-3 form-style text-start' onSubmit={addUser}>
                <h3 className='text-center'>User Register</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setusername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                <Form.Label>Select Role</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => selRole(e.target.value)}>
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                </Form.Select>
                </Form.Group>
                <div className='text-center mt-4'>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>
                <div className='text-center mt-3'>
                    <Link to="/login">Already User?, Login</Link>
                </div>
                {error && <div className='text-center text-danger'>
                    {error}
                </div>}
            </Form>
        </Container>
    </div>;
}