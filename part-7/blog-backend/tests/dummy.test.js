const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers.js')

const listWithOneBlog = [
{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
}
]
const blogs = [
{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}  
]

test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('likes in list with zero blogs', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('likes in list with one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('likes in list with multiple blog', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('most likes', () => {
    test('most likes in list with zero blogs', () => {
        const result = listHelper.favouriteBlog([])
        assert.strictEqual(result, null)
    })
    
    test('most likes in list with one blog', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0])
    })
    
    test('most likes in list with multiple blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        assert.strictEqual(result, blogs[2])
    })
})

describe('most published blogs', () => {
    test('most published author in list with zero blogs', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, null)
    })

    test('most published author in list with one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 })
    })

    test('most published author in list with multiple blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 })
    })
})

describe('most liked author', () => {
    test('most liked author in list with zero blogs', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, null)
    })

    test('most liked author in list with one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 })
    })

    test('most liked author in list with multiple blogs', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 })
    })
})