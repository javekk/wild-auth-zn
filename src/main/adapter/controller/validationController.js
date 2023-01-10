const appRoot = require('app-root-path');
const createError = require('http-errors');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');
const accessService = require(appRoot + '/src/main/core/service/accessService');


const allowIfLoggedin = async (req, res, next) => {
    try {
        const _token = req.headers['authorization']
        if (_token && _token.startsWith('Bearer ')) {
            const token = _token.substring(7)
            if (!tokenService.isTokenCorrect(token))
                next(createError(401, 'Unauthorize'));
            else {
                req.token = token
                next();
            }
        } else {
            next(createError(401, 'Unauthorize'));
        }
    } catch (error) {
        next(error);
    }
}


const canAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const {id, role} = await tokenService.getIdAndRole(req.token)
            let mAction = action
            // On gets or updates, Check where the request wants to access its own res or others
            if (id == req.params.id) {
                mAction = action.replace('Any', 'Own');
            }
            if (!accessService.canAccess(role, mAction, resource))
                next(createError(401, "+++Unauthorizen+++"));
            next()
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    allowIfLoggedin,
    canAccess,
}