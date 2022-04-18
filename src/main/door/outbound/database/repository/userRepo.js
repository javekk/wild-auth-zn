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


const getAll = async () => {
    return users.map(user => {
        return user;
    });
}

const getById = async (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (!user)
        return;
    else {
        return user;
    }
}

const getByUsername = async (username) => {
    const user = users.find(u => u.username === username);
    if (!user)
        return;
    else {
        return user;
    }
}

const createUser = async (user) => {
    user.id = Math.max(...users.map(u => u.id)) + 1;
    users.push(user)
    return user
}


const updateRole = async (id, role) => {
    const user = users.find(u => u.id === parseInt(id));
    if (!user)
        return;
    else {
        user.role = role
        return user;
    }
}


module.exports = {
    getAll,
    getById,
    getByUsername,
    createUser,
    updateRole,
};