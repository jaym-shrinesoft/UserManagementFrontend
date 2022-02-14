import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function CreatePassword() {
    const navigate = useNavigate()
    const api_key = process.env.REACT_APP_API_KEY
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [userId, setUserId] = useState()
    const params = useParams();
    const createPassword = (e) => {
        e.preventDefault();
        if (password.trim() !== confirmPassword.trim()) {
            setError("Password and Confirm password should be same");
            setTimeout(() => {
                setError(null)
            }, 2000);
        }
        else {
            axios.patch(`${api_key}/users/updatepasssword/${params.userId}`, { password: confirmPassword }).then(res => {
                setError("Password is created, Redirecting to login page")
                setTimeout(() => {
                    navigate("/login")
                    setError(null)
                }, 2000);
            })
        }
    }
    useEffect(() => {
        if (localStorage.getItem("userId")) {
            navigate("/");
        }
        else {
            axios.get(`${api_key}/users/user/${params.userId}`).then(res => {
                console.log(res.data.status);
                if (res.data.status === "active") {
                    navigate("/")
                }
            })
        }
        //eslint-disable-next-line 
    }, [])

    return <React.Fragment>
        <Container className='d-flex justify-content-center'>
            <Form className='py-3 px-4 my-3 form-style text-start' onSubmit={createPassword}>
                <h3 className='text-center'>Create Password</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Set Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className='text-center mt-4'>
                    <Button variant="primary" type="submit">
                        Set Password
                    </Button>
                </div>
                {error && <div className='text-center text-danger mt-4'>
                    {error}
                </div>}
            </Form>
        </Container>
    </React.Fragment>;
}