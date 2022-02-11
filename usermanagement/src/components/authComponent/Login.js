import React from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    const loginForm = (e) => {
        e.preventDefault();
        const user = {
            emailAddress: email,
            password: password
        }
        axios.post(`${api_key}/users/login`, user)
            .then(response => {
                if (response.data.length === 0) {
                    setError("Invalid Username or Password")
                }
                else {
                    localStorage.setItem("userId", response.data[0].id)
                    localStorage.setItem("role", response.data[0].role.roleName)
                    navigate("/")
                }
            });
    }
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, []);


    return <div>
        <Container className='d-flex justify-content-center'>
            <Form className='py-3 px-4 my-3 form-style text-start' onSubmit={loginForm}>
                <h3 className='text-center'>Login</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <div className='text-center mt-4'>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
                <div className='text-center mt-3'>
                    <Link to="/register">New User?, Register</Link>
                </div>
                {error && <div className='text-center text-danger'>
                    {error}
                </div>}
            </Form>
        </Container>
    </div>;
}