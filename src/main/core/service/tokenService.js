const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config()

const TOKEN_EXPRIRATION_TIME = config.get('app.main.token.expiration')


const getSecret = () => {
    return process.env.JWT_SECRET ?? 'oh-man-place-your-secret-in-a-dot-env-file'
}

const sign = (user) => {
    return jwt.sign({
            id: user.id,
            role: user.role 
        },
        getSecret(), {
            expiresIn: TOKEN_EXPRIRATION_TIME
        }
    );
}

const isTokenCorrect = async (token) => {
    try {
        const { _, exp } = jwt.verify(token, getSecret());
        // Check if token has expired
        return true
    }
    catch(error){
        return false
    }
}

module.exports = {
    sign,
    isTokenCorrect,
};