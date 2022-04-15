const appRoot = require('app-root-path');
const userAdapter = require(appRoot + '/src/main/door/outbound/database/adapter/userAdapter');


getAll = async () => {
    return await userAdapter.getAll();
}

getById = async (id) => {
    return await userAdapter.getById(id);
}

createUser = async (user) => {
    // validation layer etc...
    return await userAdapter.createUser(user);
}


module.exports = {
    getAll,
    getById,
    createUser,
};