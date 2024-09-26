const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session } = require('../models')

const errorHandler = (error, req, res, next) => {
    console.log('ERROR NAME', error.name)
    console.error(error.message)

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error })
    }
    else if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error })
    }
    else if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ error })
    }
    else if (error.name === 'SequelizeDatabaseError') {
        return res.status(400).json({ error })
    }
    
    next(error)
}

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch(error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    }
    else {
        return res.status(401).json({ error: 'token missing' })
    }

    const active = await Session.findOne({ token: req.decodedToken })
    console.log(active,' YO')
    if (!active) {
        return res.status(401).json({ error: 'token expired'})
    }
    next()
}

module.exports = { errorHandler, tokenExtractor }