const router = require('express').Router()

const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
    const session = await Session.findOne({ token: req.decodedToken })

    if (session) {
        await session.destroy()
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

module.exports = router