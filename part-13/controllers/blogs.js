const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where[Op.or] = [
            {
                title: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            {
                author: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }
        ]
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [
            ['likes', 'DESC'],
        ]
    })
    blogs.map(blog => console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`))
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        console.log(JSON.stringify(req.blog, null, 2))
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
        res.json(blog)
    } catch(error) {
        next(error)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        if (req.blog) {
            await req.blog.update({ likes: req.body.likes })
            res.status(200).json(req.blog)
        } else {
            res.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
    try {
        if (req.blog) {
            if (req.blog.userId != req.decodedToken.id) {
                return res.status(401).json({ error: 'unauthorized deletion' })
            }
            await req.blog.destroy()
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router