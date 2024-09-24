const info = (...params) => {
    if (process.env.NODE_ENV !== 'N/A') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'N/A') {
        console.error(...params)
    }
}

module.exports = { info, error }