const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

router.post('/', async (req, res, next) => {
    const body = req.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) { 
        return res.status(400).json({ error: 'invalid username or password' })
    }

    if (user.disabled) {
        return res.status(401).json({ error: 'account disabled, please contact admin' })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)
    
    try {
        const sessionRes = await Session.create({ token })
        console.log('Successfully added to session', sessionRes)
    } catch(error) {
        next(error)
    }

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router