const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const userAdapter = require(appRoot + '/src/main/door/outbound/database/adapter/userAdapter');
const userService = require(appRoot + '/src/main/core/service/userService');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');



// Mock

const newUser = new User(
    username = 'new',
    password = 'new',
    firstName = 'Carmine',
    lastName = 'Verdi',
    role = 'User'
)

const usersFromDb = [
    new User(
        id = 1,
        username = 'admin',
        password = 'admin',
        firstName = 'Gennaro',
        lastName = 'Donnola',
        role = 'Admin'
    ),
    new User(
        id = 2,
        username = 'user1',
        password = 'user1',
        firstName = 'Franco',
        lastName = 'Sbaus',
        role = 'User',
    ),
];


t.afterEach(t => {
    sinon.restore()
})

// test



// LOGIN

t.test('GIVEN a NOT existing username WHEN the login process is called THEN an error is retrieved', async t => {

    try {
        const username = 'bruno'
        const password = 'superquattro'
        const mFun = sinon.stub(userAdapter, "getByUsername");
        mFun.withArgs(username).returns()

        await userService.login(username, password)
        t.fail('Should not get here');
    } catch (err) {
        t.ok(err, 'User not found');
    }
    t.end();
})


t.test('GIVEN a username and a wrong password WHEN the login process is called THEN an error is retrieved', async t => {

    try {
        const username = 'admin'
        const password = 'amdin'
        const mFun = sinon.stub(userAdapter, "getByUsername");
        mFun.withArgs(username).returns(usersFromDb[0])

        await userService.login(username, password)
        t.fail('Should not get here');
    } catch (err) {
        t.ok(err,'Password is not correct');
    }
    t.end();
})


t.test('GIVEN correct credentials WHEN the login process is called THEN a new token is retrieved correctly', async t => {

    const username = 'admin'
    const password = 'admin'
    const mFun = sinon.stub(userAdapter, "getByUsername");
    mFun.withArgs(username).returns(usersFromDb[0])

    const mToken = sinon.stub(tokenService, "sign");
    mToken.withArgs(usersFromDb[0]).returns('token.token.token')

    const result = await userService.login(username, password)
    console.log(result)
    t.test(
        'check it is correct token',
        async t => t.ok(result)
    )
})



// CRUD

t.test('Get all users correctly', async t => {

    sinon.stub(userAdapter, "getAll").returns(usersFromDb);

    const users = await userService.getAll()

    t.test(
        'check size',
        async t => t.equal(2, users.length)
    )
})


t.test('GIVEN an existing user id WHEN get by id is called THEN the user is retrieved correctly', async t => {

    const id = 1
    const mFun = sinon.stub(userAdapter, "getById");
    mFun.withArgs(id).returns(usersFromDb[0])

    const user = await userService.getById(id)

    t.test(
        'check it is retrieved correctly',
        async t => t.ok(user)
    )
    t.test(
        'check correct id',
        async t => t.ok(id, user.id)
    )
})


t.test('GIVEN a NOT existing user id WHEN get by id is called THEN null is retrieved', async t => {

    const id = 1
    const mFun = sinon.stub(userAdapter, "getById");
    mFun.withArgs(id).returns()

    const user = await userService.getById(id)

    t.test(
        'check it is null',
        async t => t.notOk(user)
    )
})


t.test('GIVEN a new user object WHEN the create user process is called THEN it is persisted correctly', async t => {

    const userToPersit = new User(
        username = 'new',
        password = 'new',
        firstName = 'Carmine',
        lastName = 'Verdi',
        role = 'User'
    )

    const mFun = sinon.stub(userAdapter, "createUser").returns(newUser);

    const createdUser = await userService.createUser(userToPersit)

    t.test(
        'check it is not null',
        async t => t.ok(createdUser)
    )
})




t.test('GIVEN a NOT existing user id  WHEN the role is updated THEN null is retrieved', async t => {
   
    sinon.stub(userAdapter, "updateRole").returns();
    const user = await userService.updateRole(0, 'God')

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
    sinon.stub(userAdapter, "updateRole").returns(userToPersit);
    const user = await userService.updateRole(1, 'God')

    t.test(
        'check it is retrieved correctly',
        async t => t.ok(user)
    )
})
