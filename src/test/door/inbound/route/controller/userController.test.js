const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const chai = require('chai');
chai.should();


const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const userController = require(appRoot + '/src/main/door/inbound/route/controller/userController');
const userService = require(appRoot + '/src/main/core/service/userService');



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

let status;
let json;
let res;

t.beforeEach(t => {
    status = sinon.stub();
    json = sinon.spy();
    res = {
        json,
        status
    };
    status.returns(res);
})

t.afterEach(t => {
    sinon.restore()
})



// LOGIN

t.test('GIVEN a NOT existing username WHEN the login process is called THEN an error is retrieved', async t => {

    const username = 'bruno'
    const password = 'superquattro'

    const req = {
        body: {
            username: username,
            password: password
        }
    }
    const next = () => {};

    const mFun = sinon.stub(userService, "login");
    mFun.withArgs(username, password).throws('User not found')

    await userController.login(req, res, next)

    status.calledWith(400).should.not.ok
    t.pass('check it returns 400 Bad Request')
})


t.test('GIVEN a username and a wrong password WHEN the login process is called THEN an error is retrieved', async t => {

    const username = 'bruno'
    const password = 'superquattro'

    const req = {
        body: {
            username: username,
            password: password
        }
    }
    const next = () => {};

    const mFun = sinon.stub(userService, "login");
    mFun.withArgs(username, password).throws('Wrong password')

    await userController.login(req, res, next)

    status.calledWith(400).should.not.ok
    t.pass('check it returns 400 Bad Request')
})


t.test('GIVEN a username and a password WHEN the login process is called and a generic error occured THEN 500 is returned', async t => {

    const username = 'bruno'
    const password = 'superquattro'

    const req = {
        body: {
            username: username,
            password: password
        }
    }
    const next = () => {};

    const mFun = sinon.stub(userService, "login");
    mFun.withArgs(username, password).throws('Carbonare with cream')

    await userController.login(req, res, next)

    status.calledWith(500).should.not.ok
    t.pass('check it returns 500 Internal server error')
})


t.test('GIVEN correct credentials WHEN the login process is called THEN a new token is retrieved correctly', async t => {

    const username = 'bruno'
    const password = 'superquattro'

    const req = {
        body: {
            username: username,
            password: password
        }
    }
    const next = () => {};

    const mFun = sinon.stub(userService, "login");
    mFun.withArgs(username, password).returns("Token.Token.Token")

    await userController.login(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('token retrieved correctly')
})


// CRUD

t.test('Get all users correctly', async t => {

    const req = {}
    const next = () => {};
    sinon.stub(userService, "getAll").returns(usersFromDb);

    await userController.getAll(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('check it returns 200 OK')
})


t.test('Get all users correctly', async t => {

    const req = {}
    const next = () => {};
    sinon.stub(userService, "getAll").returns(usersFromDb);

    await userController.getAll(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('check it returns 200 OK')
})


t.test('GIVEN an existing user id WHEN get by id is called THEN the user is retrieved correctly', async t => {

    const id = 1
    const mFun = sinon.stub(userService, "getById");
    mFun.withArgs(id).returns(usersFromDb[0])

    const req = {
        params: {
            id: id
        }
    }
    const next = () => {};

    await userController.getById(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('check it returns 200 OK')
})


t.test('GIVEN a NOT existing user id WHEN get by id is called THEN null is retrieved', async t => {

    const id = 1
    const mFun = sinon.stub(userService, "getById");
    mFun.withArgs(id).returns()

    const req = {
        params: {
            id: id
        }
    }
    const next = () => {};

    await userController.getById(req, res, next)

    status.calledWith(404).should.not.ok
    t.pass('check it returns 404 NOT FOUND')
})



t.test('GIVEN user body WHEN create user is called THEN the user is created correctly', async t => {

    const mFun = sinon.stub(userService, "createUser");
    mFun.returns(newUser)

    const req = { params: newUser }
    const next = () => {};

    await userController.createUser(req, res, next)

    status.calledWith(201).should.be.ok
    t.pass('check it returns 201 OK')
})


t.test('GIVEN user body WHEN create user is called and the user is not created THEN an error is thrown', async t => {

    const mFun = sinon.stub(userService, "createUser");
    mFun.returns()

    const req = { params: newUser }
    const next = () => {};

    await userController.createUser(req, res, next)

    status.calledWith(500).should.not.ok
    t.pass('check it returns 500')
})



t.test('GIVEN wrong user body WHEN create user is called THEN an error is thrown', async t => {

    const mFun = sinon.stub(userService, "createUser");
    mFun.throws()

    const req = { params: newUser }
    const next = () => {};

    await userController.createUser(req, res, next)

    status.calledWith(500).should.not.ok
    t.pass('check it returns 500')
})





t.test('GIVEN an id and a role WHEN update role is called THEN the role is updated correctly', async t => {

    const mFun = sinon.stub(userService, "updateRole");
    mFun.returns(usersFromDb[0])

    const req = { params: {
        id: '1',
        role: 'Superdmin',
    } }
    const next = () => {};

    await userController.updateRole(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('check it returns 201 OK')
})


t.test('GIVEN an id and a role WHEN update role is called and the user is not found THEN an error is thrown', async t => {

    const mFun = sinon.stub(userService, "updateRole");
    mFun.returns()

    const req = { params: {
        id: '3',
        role: 'Superadmin',
    } }
    const next = () => {};

    await userController.updateRole(req, res, next)

    status.calledWith(404).should.not.ok
    t.pass('check it returns 404 not found')
})



t.test('GIVEN an id and a role WHEN update role is called and an error happens THEN an error is thrown', async t => {

    const mFun = sinon.stub(userService, "updateRole");
    mFun.throws()

    const req = { params: {
        id: '1',
        role: 'Superdmin',
    } }
    const next = () => {};

    await userController.updateRole(req, res, next)

    status.calledWith(500).should.not.ok
    t.pass('check it returns 500')
})



