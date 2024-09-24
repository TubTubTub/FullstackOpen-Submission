import { ListGroup, ListGroupItem } from 'react-bootstrap'

const UserView = ({ user, userBlogs }) => {
    if ( !user || !userBlogs) return null

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {
                userBlogs.length === 0 ?
                <p>No blogs added by {user.name}!</p> :
                <ListGroup variant="numbered">{userBlogs.map(blog => <ListGroupItem key={blog.id}>{blog.title}</ListGroupItem>)}</ListGroup>
            }
        </div>
    )
}

export default UserView