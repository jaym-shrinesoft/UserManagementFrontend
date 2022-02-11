import React from 'react';
import { Container } from 'react-bootstrap';
import UserTable from './UserTable';

export default function UserDetails() {
  return <div>
    <Container>
      <h2 className='text-center my-3'>Users List</h2>
      <div className='text-center'>
        <UserTable />
      </div>
    </Container>
  </div>;
}
