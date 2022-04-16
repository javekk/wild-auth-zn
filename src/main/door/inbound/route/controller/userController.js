const appRoot = require('app-root-path');
const createError = require('http-errors');
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const userService = require(appRoot + '/src/main/core/service/userService');


getAll = async (req, res, next) => {
    const users = await userService.getAll();
    res.status(200).json(users);
}

getById = async (req, res, next) => {
    const id = req.params.id;
    const user = await userService.getById(id);
    if (user)
        res.status(200).json(user);        
    else
        return next(createError(404));
}

createUser = async (req, res, next) => {
    try {
        const newUser = req.body
        const createdUser = await userService.createUser(newUser);
        if (createdUser)
            res.status(201).json(createdUser);
        else
            return next(createError(500));
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAll,
    getById,
    createUser,
}