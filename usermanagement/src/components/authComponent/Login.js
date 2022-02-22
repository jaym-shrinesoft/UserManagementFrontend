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
    const validateEmail = (e) => {
        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return String(e).search(filter) !== -1;
    }
    const loginForm = (e) => {
        e.preventDefault();
        if (email.trim() === 0 || !validateEmail(email)) {
            setError("Enter valid Email")
            setTimeout(() => {
                setError(null)
            }, 2500);
        }
        else if (password.trim() === "") {
            setError("Enter valid password")
            setTimeout(() => {
                setError(null)
            }, 2500);
        }
        else {
            const user = {
                emailAddress: email.trim(),
                password: password.trim()
            }
            axios.post(`${api_key}/auth/login`, user)
                .then(response => {
                    console.log(response.data);
                    if (response.data.length === 0) {
                        setError("Invalid Username or Password.")
                    }
                    else {
                        if (response.data.status === "active") {
                            console.log(response)
                            localStorage.setItem("userId", response.data.userId)
                            localStorage.setItem("role", response.data.roleName)
                            localStorage.setItem("jwt", response.data.token)
                            navigate("/")
                        }
                        else {
                            setError("User is not active, Please check your email to active your account.")
                            setTimeout(() => {
                                setError(null)
                            }, 5000);
                        }
                    }
                }).catch(e => {
                    setError("Enter valid Email or Password")
                            setTimeout(() => {
                                setError(null)
                            }, 5000);
                });
        }

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
                    <Form.Control value={email} type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
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
