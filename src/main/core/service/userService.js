const appRoot = require('app-root-path');
const userDao = require(appRoot + '/src/main/door/outbound/database/adapter/userAdapter');

const tokenService = require(appRoot + '/src/main/core/service/tokenService');


login = async (username, password) => {

    const user = await userDao.getByUsername(username);
    if (!user)
        throw new Error('User not found');

    const validPassword = validatePassword(password, user.password);
    if (!validPassword)
        throw new Error('Wrong password');

    return await tokenService.sign(user);
}


getAll = async () => {
    return await userDao.getAll();
}


getById = async (id) => {
    return await userDao.getById(id);
}


createUser = async (user) => {
    // validation layer etc...
    return await userDao.createUser(user);
}


validatePassword = (password, storePassword) => {
    // TODO compare hashed passwords etc.    
    return password === storePassword
}

module.exports = {
    login,
    getAll,
    getById,
    createUser,
};