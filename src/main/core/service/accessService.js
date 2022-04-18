const appRoot = require('app-root-path');
const roles = require(appRoot + '/src/main/core/domain/role');


const canAccess = (role, action, resource) => {
    const permission = roles.getAccessControl().can(role)[action](resource);
    return permission.granted;
}


module.exports = {
    canAccess
};