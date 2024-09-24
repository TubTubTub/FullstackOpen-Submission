const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Blog 1",
        "author": "Author 1",
        "url": "blog1.com",
        "likes": 10
    },
    {
        "title": "Blog 2",
        "author": "Author 2",
        "url": "blog2.net",
        "likes": 20
    }
]

const initialUser = {
        "name": "Testing User",
        "username": "test-user-10",
        "password": "12356789"
}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'temporary blog '})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find()
    return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUser , nonExistingId, blogsInDb, usersInDb }