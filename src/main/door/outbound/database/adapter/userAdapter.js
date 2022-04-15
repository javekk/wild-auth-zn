const appRoot = require('app-root-path');
const userRepo = require(appRoot + '/src/main/door/outbound/database/repository/userRepo.js');
const {
    User
} = require(appRoot + '/src/main/core/domain/user');


// Mapper 

function toDB(user) {
    return {
        id: user.id,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
    }
}

function toBL(user) {
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


// adapters

async function getAll() {
    return (await userRepo.getAll()).map(user => toBL(user));
}

async function getById(id) {
    const user = await userRepo.getById(id);
    return toBL(user);
}

async function createUser(user) {
    const createdUser = await userRepo.createUser(toDB(user));
    return toBL(createdUser);
}


module.exports = {
    getAll,
    getById,
    createUser,
};