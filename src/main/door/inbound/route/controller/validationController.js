const appRoot = require('app-root-path');
const createError = require('http-errors');
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');


const allowIfLoggedin = async (req, res, next) => {
    try {
        const _token = req.headers['authorization']
        if (_token && _token.startsWith('Bearer ')) {
            const token = _token.substring(7)
            if (!tokenService.isTokenCorrect(token))
                next(createError(401, 'Expired token, please log in again'));
            else
                next();
        } else {
            next(createError(401, 'Unauthorize'));
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    allowIfLoggedin,
}
