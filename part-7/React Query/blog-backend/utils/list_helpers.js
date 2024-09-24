const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let count = 0
    blogs.forEach(blog => {
        count += blog.likes
    })
    return count
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((blog1, blog2) => (blog1.likes > blog2.likes ? blog1 : blog2), { likes: -1 })
}

const mostBlogs = (blogs) => {
    const authorCount = _.countBy(blogs, (blog) => blog.author)
    const maxAuthor = _.maxBy(Object.entries(authorCount), (entry) => entry[1])
    return maxAuthor ? { author: maxAuthor[0], blogs: maxAuthor[1] } : null
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, (blog) => blog.author)

    for (const author in authors) {
        const authorBlogs = authors[author]
        let likes = 0

        for (let i = 0; i < authorBlogs.length; i++) {
            likes += authorBlogs[i].likes
        }
        authors[author] = likes
    }

    const mostLikedAuthor = _.maxBy(Object.entries(authors),  (entry) => entry[1])
    return mostLikedAuthor ? { author: mostLikedAuthor[0], likes: mostLikedAuthor[1] } : null
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }