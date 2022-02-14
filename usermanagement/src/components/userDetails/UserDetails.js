import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import UserTable from './UserTable';
import { useNavigate } from 'react-router-dom';

export default function UserDetails() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  return <div>
    <Container>
      <h2 className='text-center my-3'>Users List</h2>
      <div className='text-center'>
        <UserTable />
      </div>
    </Container>
  </div>;
}
