const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id},"kamran",{expiresIn:'1d'})
}

module.exports = {generateToken}