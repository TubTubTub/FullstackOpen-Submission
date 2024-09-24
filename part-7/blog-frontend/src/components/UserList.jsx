import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import userService from '../services/users'
import UserView from './UserView'

const UserList = () => {
    const [users, setUsers] = useState([])
    const currentUser = useSelector(state => state.user)

    useEffect(() => {
        userService.getAll()
            .then(result => {
                setUsers(result)
            })
    }, [])

    const match = useMatch('/users/:id')

    const selectedUser = match ? users.find(user => user.id === match.params.id) : currentUser
    const selectedBlogs =  selectedUser ? selectedUser.blogs : null

    return (
        <div>
            <h2>Users</h2>
            <Table striped hover className="col-2">

                <thead>
                    <tr>
                        <td width="15%"></td>
                        <td><b>blogs created</b></td>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{Number(user.blogs.length)}</td>
                    </tr>
                    )}
                </tbody>

            </Table>

            <Routes>
                <Route path=":id" element={<UserView user={selectedUser} userBlogs={selectedBlogs} />} />
            </Routes>
        </div>
    )
}

export default UserList