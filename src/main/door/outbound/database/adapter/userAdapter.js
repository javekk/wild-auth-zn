const appRoot = require('app-root-path');
const userRepo = require(appRoot + '/src/main/door/outbound/database/repository/userRepo.js');
const {
    User
} = require(appRoot + '/src/main/core/domain/user');


// Mapper 

const toDB = (user) => {
    return {
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    }
}

const toBL = (user) => {
    if(user)
        return new User(
            user.id,
            user.username,
            user.password,
            user.firstName,
            user.lastName,
            user.role,
        )
}


// dao

const getAll = async () => {
    return (await userRepo.getAll()).map(user => toBL(user));
}

const getById = async (id) => {
    const user = await userRepo.getById(id);
    return toBL(user);
}

const getByUsername = async (username) => {
    const user = await userRepo.getByUsername(username);
    return toBL(user);
}

const createUser = async (user) => {
    const createdUser = await userRepo.createUser(toDB(user));
    return toBL(createdUser);
}


module.exports = {
    getAll,
    getById,
    getByUsername,
    createUser,
};