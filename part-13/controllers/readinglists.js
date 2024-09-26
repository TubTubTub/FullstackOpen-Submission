const router = require('express').Router()

const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
    try {
        const reading = await ReadingList.create(req.body)
        res.json(reading)
    } catch(error) {
        next(error)
    }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const reading = await ReadingList.findByPk(req.params.id)

        if (reading) {
            if (reading.userId != req.decodedToken.id) {
                console.log(reading.userId, req.decodedToken.id)
                return res.status(401).json({ error: 'unauthorized request' })
            }

            await reading.update({ read: req.body.read })
            res.status(200).json(reading)
        } else {
            res.status(404).end()
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router