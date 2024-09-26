const router = require('express').Router()

const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
    const where = {}

    if (req.query.read) {
        console.log(req.query.read, typeof req.query.read, 'WOWOW')
        where.read = req.query.read
    }

    req.user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt']},
        include: {
            model: Blog,
            as: 'readings',
            attributes: ['author', 'title'],
            through: {
                attributes: ['read', 'id'],
                where
            },
        }
    })
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt']},
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] }
            },
            {
                model: Blog,
                as: 'readings',
                through: {
                    attributes: []
                }
            }
        ]
    })
    res.json(users)
})

router.get('/:id', userFinder, async (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.status(400).end()
    }
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        console.log(user, 'WWO')
        res.json(user)
    } catch(error) {
        next(error)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        if (user) {
            await user.update({ username: req.body.username })
            res.status(200).json(req.blog)
        } else {
            res.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router