import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogDisplay = ({ blogs }) => {
  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    return 1
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Table striped>
      <tbody>
        {[...blogs].sort(sortByLikes).map(blog => {
          return (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default BlogDisplay