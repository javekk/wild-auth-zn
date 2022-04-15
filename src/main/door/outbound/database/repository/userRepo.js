// FAKE DB
const users = [{
        id: 1,
        username: 'superadmin',
        password: 'superadmin',
        firstName: 'Hans',
        lastName: 'Von Hammein',
        role: 'SuperAdmin'
    },
    {
        id: 2,
        username: 'admin',
        password: 'admin',
        firstName: 'Gennaro',
        lastName: 'Donnola',
        role: 'Admin'
    },
    {
        id: 3,
        username: 'user1',
        password: 'user1',
        firstName: 'Franco',
        lastName: 'Sbaus',
        role: 'User',
    },
    {
        id: 4,
        username: 'user2',
        password: 'user2',
        firstName: 'Sergej',
        lastName: 'Nikolaj',
        role: 'User',
    }
];

async function getAll() {
    return users.map(user => {
        delete user.password;
        return user;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user)
        return;
    else {
        delete user.password;
        return user;
    }
}

async function createUser(user) {
    user.id = Math.max(...users.map(u => u.id)) + 1;
    users.push(user)
    delete user.password;
    return user
}


module.exports = {
    getAll,
    getById,
    createUser,
};