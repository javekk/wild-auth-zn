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
    res = { json, status };
    status.returns(res);
})

t.afterEach(t => {
    sinon.restore()
})

// test


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



t.test('GIVEN an existing user id THEN the user is retrieved correctly', async t => {

    const id = 1
    const mFun = sinon.stub(userService, "getById");
    mFun.withArgs(id).returns(usersFromDb[0])

    const req = { params: { id: id } }
    const next = () => {};

    await userController.getById(req, res, next)

    status.calledWith(200).should.be.ok
    t.pass('check it returns 200 OK')
})


t.test('GIVEN a NOT existing user id THEN null is retrieved', async t => {

    const id = 1
    const mFun = sinon.stub(userService, "getById");
    mFun.withArgs(id).returns()

    const req = { params: { id: id } }
    const next = () => {};

    await userController.getById(req, res, next)

    status.calledWith(404).should.not.ok
    t.pass('check it returns 404 NOT FOUND')
})