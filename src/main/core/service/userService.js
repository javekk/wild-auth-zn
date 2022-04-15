const appRoot = require('app-root-path');
const userAdapter = require(appRoot + '/src/main/door/outbound/database/adapter/userAdapter');



async function getAll() {
    return await userAdapter.getAll();
}

async function getById(id) {
    return await userAdapter.getById(id);
}

async function createUser(user) {
    // validation layer etc...
    return await userAdapter.createUser(user);
}


module.exports = {
    getAll,
    getById,
    createUser,
};