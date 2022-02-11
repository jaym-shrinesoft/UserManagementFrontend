import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";


export default function UserTable() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [localUser, setLocalUser] = useState();
    const [canAdd, setcanAdd] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null)
    const [show, setShow] = useState(false);
    const [deleteId, setdeleteId] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = (userId, userName) => {
        setdeleteId(userId)
        setDeleteMessage(userName)
        setShow(true)
    }
    const api_key = process.env.REACT_APP_API_KEY;

    const deleteItem = (id) => {
        axios.delete(`${api_key}/users/delete/${id}`)
        setDeleteMessage(null)
    }

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/login");
    }

    useEffect(() => {
        axios.get(`${api_key}/users/user/${localStorage.getItem("userId")}`)
            .then(response => {
                setcanAdd(response.data.role.roleName !== "Level 1")
                setCanDelete(response.data.role.roleName === "Level 3")
                setLocalUser(response.data)
            });
        return () => {
            setUsers([])
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        axios.get(`${api_key}/users/getAll`).then(response => setUsers(response.data));
        // eslint-disable-next-line
    }, [users]);
    return <React.Fragment>
        {deleteMessage && <Container className='d-flex justify-content-center my-2 text-center alertbox'>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Do you want to delete {deleteMessage}?</h5></Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => { deleteItem(deleteId) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>}
        <Container className="d-flex justify-content-between my-2">
            {localUser && <h4>Hello, {localUser.fullName}</h4>}
            {localUser &&
                <Button variant="danger" onClick={logout}>
                    LogOut
                </Button>}
        </Container>
        <Container className="text-center mb-2">
            {canAdd && <Link to="/register" className='btn btn-primary'>
                Create User
            </Link>}
        </Container>
        <Container>
            <Table bordered size="sm" className='text-start custom-table-style' responsive>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        {canDelete && <th>Delete</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 ? users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.userName}</td>
                                <td>{user.fullName}</td>
                                <td>{user.emailAddress}</td>
                                <td>{user.status}</td>
                                <td>{user.role.roleName}</td>
                                {canDelete && <td><Button variant="danger" disabled={user.id === localUser.id} size="sm" onClick={() => { handleShow(user.id, user.userName) }}>Delete</Button></td>}
                            </tr>
                        )
                    }) : <tr><td className="text-center" colSpan={6}>No Data Available</td></tr>}
                </tbody>
            </Table>
        </Container>
    </React.Fragment>;
}