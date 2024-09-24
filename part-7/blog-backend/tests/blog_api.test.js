const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helpers')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const userDetails = await api.post('/api/users').send(helper.initialUser)
    const loginDetails = await api.post('/api/login').send({
        username: helper.initialUser.username,
        password: helper.initialUser.password
    })

    const blogs = helper.initialBlogs.map(blog => ({ ...blog, user: userDetails.body.id }))
    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    token = loginDetails.body.token

    await Promise.all(promiseArray)
})

describe('returning a blog', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test("blogs return 'id' property", async () => {
        let blogsAtEnd = await helper.blogsInDb()
        assert(blogsAtEnd.every((blog) => (('id' in blog) && !('_id' in blog))))
    })
})

describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            "title": "Blog 3",
            "author": "Author 3",
            "url": "blog3.org",
            "likes": 30
        }
        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(blog => blog.title)

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        assert(titles.includes('Blog 3'))
    })

    test('blog with no likes defaults to 0', async () => {
        const newBlog = {
            "title": "Unliked blog",
            "author": "Unliked author",
            "url": "unlikedblog.org",
        }

        const returnedBlogObject = await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(returnedBlogObject.body.likes, 0)
    })

    test('blog without title or url is not added', async () => {
        const newUntitledBlog = {
            "author": "Untitled author",
            "url": "untitledblog.org",
            "likes": 10
        }
        const newUnURLBlog = {
            "title": "No ULR blog",
            "author": "UnURLed author",
            "likes": 10
        }

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newUntitledBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            
        await api.post('/api/blogs')
           .set('Authorization', `Bearer ${token}`)
            .send(newUnURLBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('changing a blog', () => {
    test('a valid blog can be deleted', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        await api.delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('a valid blog can be updated', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        const newBlog = {
            title: 'New blog',
            author: 'New blogger',
            url: 'newblog.gov',
            likes: 100
        }

        await api.put(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[0].title, newBlog.title)
    })
})

describe('incorrect user', () => {
    test('blog is not added when user token is not provided', async () => {
        const newBlog = {
            "title": "Unauthorized Blog",
            "author": "Unauthorized Blogger",
            "url": "unauthorizedblog.org",
            "likes": 50
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('adding a user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('user with unique username can be added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'xX_Jeremiah_Xx',
            username: 'Jeremiah',
            password: '123456789',
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('user with existing username is not added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Tom Bob',
            username: 'root',
            password: '987654321'
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('expected `username` to be unique'))
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
    test('user with invalid short username is not added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Lebron James',
            username: 'YS',
            password: '999999999'
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            
        assert(result.body.error.includes('User validation failed'))
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
    test('user without password is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Ben',
            username: 'Benjamin'
        }
        
        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('password missing'))
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
        
    test('user with invalid short password is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'James',
            username: 'MyNameIsJames',
            password: '12'
        }
        
        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('invalid password too short'))
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

})

after(async () => {
    await mongoose.connection.close()
})