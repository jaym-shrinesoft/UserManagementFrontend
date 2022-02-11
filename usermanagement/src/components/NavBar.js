import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function NavBar() {
    return <>
        <div className='bg-light py-2'>
            <Container className='text-center'>
                <h2><Link className='text-dark text-decoration-none' to="/">User Management</Link></h2>
            </Container></div>
    </>;
}
