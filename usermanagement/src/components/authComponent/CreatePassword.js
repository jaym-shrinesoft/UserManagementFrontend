import React from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function CreatePassword() {
    const id = useParams();
    console.log(id);
    const createPassword = (e) => {
        e.preventDefault();
        console.log(`Submitted for userid ${id.userid}`);
    }
    return <React.Fragment>
        <Container className='d-flex justify-content-center'>
            <Form className='py-3 px-4 my-3 form-style text-start' onSubmit={createPassword}>
                <h3 className='text-center'>Create Password</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Set Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter confirm password" />
                </Form.Group>
                <div className='text-center mt-4'>
                    <Button variant="primary" type="submit">
                        Set Password
                    </Button>
                </div>
            </Form>
        </Container>
    </React.Fragment>;
}