const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const userRepo = require(appRoot + '/src/main/adapter/database/repository/userRepo');
const userAdapter = require(appRoot + '/src/main/adapter/database/dao/userDao');



// Mock

const newUser = {
    id: 3,
    username: 'new',
    password: 'new',
    firstName: 'Carmine',
    lastName: 'Verdi',
    role: 'User'
}

const usersFromDb = [{
        id: 1,
        username: 'admin',
        password: 'admin',
        firstName: 'Gennaro',
        lastName: 'Donnola',
        role: 'Admin'
    },
    {
        id: 2,
        username: 'user1',
        password: 'user1',
        firstName: 'Franco',
        lastName: 'Sbaus',
        role: 'User',
    },
];


t.afterEach(t => {
    sinon.restore()
})

// test



t.test('Get all users correctly', async t => {

    sinon.stub(userRepo, "getAll").returns(usersFromDb);

    const users = await userAdapter.getAll()

    t.test(
        'check size',
        async t => t.equal(2, users.length)
    )
})


t.test('GIVEN an existing user id THEN the user is retrieved correctly', async t => {

    const id = 1
    const mFun = sinon.stub(userRepo, "getById");
    mFun.withArgs(id).returns(usersFromDb[0])

    const user = await userAdapter.getById(id)

    t.test(
        'check it is retrieved correctly',
        async t => t.ok(user)
    )
    t.test(
        'check correct id',
        async t => t.ok(id, user.id)
    )
})


t.test('GIVEN a NOT existing user id THEN null is retrieved', async t => {

    const id = 1
    const mFun = sinon.stub(userRepo, "getById");
    mFun.withArgs(id).returns()

    const user = await userAdapter.getById(id)

    t.test(
        'check it is null',
        async t => t.notOk(user)
    )
})



t.test('GIVEN an existing username THEN the user is retrieved correctly', async t => {

    const username = 'user1'
    const mFun = sinon.stub(userRepo, "getByUsername");
    mFun.withArgs(username).returns(usersFromDb[0])

    const user = await userAdapter.getByUsername(username)

    t.test(
        'check it is retrieved correctly',
        async t => t.ok(user)
    )
    t.test(
        'check correct id',
        async t => t.ok(username, user.username)
    )
})


t.test('GIVEN a NOT existing user id THEN null is retrieved', async t => {

    const username = 'Franco'
    const mFun = sinon.stub(userRepo, "getByUsername");
    mFun.withArgs(username).returns()

    const user = await userAdapter.getByUsername(username)

    t.test(
        'check it is null',
        async t => t.notOk(user)
    )
})



t.test('GIVEN a new user object THEN it is persisted correctly', async t => {

    const userToPersit = new User(
        username = 'new',
        password = 'new',
        firstName = 'Carmine',
        lastName = 'Verdi',
        role = 'User'
    )

    const mFun = sinon.stub(userRepo, "createUser").returns(newUser);

    const createdUser = await userAdapter.createUser(userToPersit)

    t.test(
        'check it is not null',
        async t => t.ok(createdUser)
    )
})





t.test('GIVEN a NOT existing user id  WHEN the role is updated THEN null is retrieved', async t => {
   
    sinon.stub(userRepo, "updateRole").returns();
    const user = await userAdapter.updateRole(0, 'God')

    t.test(
        'check it is null',
        async t => t.notOk(user)
    )
})


t.test('GIVEN an existing user id WHEN the role is updated THEN it is updated correctly', async t => {

    const userToPersit = new User(
        username = 'new',
        password = 'new',
        firstName = 'Carmine',
        lastName = 'Verdi',
        role = 'God'
    )
    sinon.stub(userRepo, "updateRole").returns(userToPersit);
    const user = await userAdapter.updateRole(1, 'God')

    t.test(
        'check it is retrieved correctly',
        async t => t.ok(user)
    )
})
