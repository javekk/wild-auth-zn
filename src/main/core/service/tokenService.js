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
            role: user.role // Not secure for public api
        },
        getSecret(), {
            expiresIn: TOKEN_EXPRIRATION_TIME
        }
    );
}

const isTokenCorrect =  (token) => {
    try {
        jwt.verify(token, getSecret());
        return true
    }
    catch(error){
        return false
    }
}

const getIdAndRole = (token) => {
    try {
        const { id, role } = jwt.verify(token, getSecret());
        return { id, role }
    }
    catch(error){
        return 
    }
}

module.exports = {
    sign,
    isTokenCorrect,
    getIdAndRole
};