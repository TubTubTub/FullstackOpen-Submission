const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blogResponse = await Blog.findById(request.params.id)
    if (blogResponse) {
        response.json(blogResponse)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.title) {
        return response.status(400).json({ error: 'title missing' }) // 'return' to exit function and not create erroneous blog
    }
    if (!body.url) {
        return response.status(400).json({ error: 'url missing' })
    }

    const newBlog = { ...body, user: user._id }

    const blog = new Blog(newBlog)
    let result = await blog.save()
    result = await result.populate('user', { name: 1, username: 1 })

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(400).json({ error: 'blog does not exist' })
    }

    if (blog.user.toString() === request.user.id) {
        await Blog.deleteOne(blog)
        return response.status(204).end()
    }

    return response.status(401).json({ error: 'blog created by different user' })
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    await result.populate('user', { name: 1, username: 1 })
    response.json(result)
})

module.exports = blogsRouter