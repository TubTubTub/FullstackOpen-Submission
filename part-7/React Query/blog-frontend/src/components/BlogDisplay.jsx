import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogDisplay = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const sortByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    return 1
  }

  return (
    <div>
        {[...blogs].sort(sortByLikes).map(blog => {
        return <Blog key={blog.id} blog={blog} />}
      )}
    </div>
  )
}

export default BlogDisplay