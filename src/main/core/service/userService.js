const appRoot = require('app-root-path');
const userDao = require(appRoot + '/src/main/adapter/database/dao/userDao');

const tokenService = require(appRoot + '/src/main/core/service/tokenService');


const login = async (username, password) => {

    const user = await userDao.getByUsername(username);
    if (!user)
        throw new Error('User not found');

    const validPassword = validatePassword(password, user.password);
    if (!validPassword)
        throw new Error('Wrong password');

    return await tokenService.sign(user);
}


const getAll = async () => {
    return await userDao.getAll();
}


const getById = async (id) => {
    return await userDao.getById(id);
}


const createUser = async (user) => {
    // validation layer etc...
    return await userDao.createUser(user);
}


const updateRole = async (id, role) => {
    return await userDao.updateRole(id, role)
}


const validatePassword = (password, storePassword) => {
    // TODO compare hashed passwords etc.    
    return password === storePassword
}

module.exports = {
    login,
    getAll,
    getById,
    createUser,
    updateRole,
};