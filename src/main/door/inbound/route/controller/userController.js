const appRoot = require('app-root-path');
const createError = require('http-errors');
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const userService = require(appRoot + '/src/main/core/service/userService');


const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await userService.login(username, password);
        res.status(200).json({ Bearer: token })
    } catch(error) {
        if (error == 'User not found' || error == 'Wrong password')
            next(createError(400, error));  
        else 
            next(createError(500));  
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error){
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getById(id);
        if (user)
            res.status(200).json(user);        
        else
            next(createError(404, 'user not found'));
    } catch (error){
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const newUser = req.body
        const createdUser = await userService.createUser(newUser);
        if (createdUser)
            res.status(201).json(createdUser);
        else
            next(createError(500));
    } catch (error) {
        next(error)
    }
}


module.exports = {
    login,
    getAll,
    getById,
    createUser,
}