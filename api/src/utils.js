function getHostName() {
    return process.env.PROD && process.env.PROD === 'true' ? 'https://24h.chamallow.fr' : `http://localhost:${process.env.API_PORT}`
}

module.exports = {
    getHostName
}