const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const chai = require('chai');
chai.should();

const validationController = require(appRoot + '/src/main/door/inbound/route/controller/validationController');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');
const accessService = require(appRoot + '/src/main/core/service/accessService');


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



// allow if logged in

t.test('GIVEN a request with no authorization WHEN check if loggedin THEN an error is retrieved', async t => {

    const req = {}
    const next = () => {};
    await validationController.allowIfLoggedin(req, res, next)

    status.calledWith(401).should.not.ok
    t.pass('check it returns 401 Unauthorize')
})


t.test('GIVEN a wrong token WHEN check if loggedin THEN an error is retrieved', async t => {

    const req = {headers: {authorization: 'Sorry Bro'}}
    const next = () => {};
    await validationController.allowIfLoggedin(req, res, next)

    status.calledWith(401).should.not.ok
    t.pass('check it returns 401 Unauthorize')
})


t.test('GIVEN a not valid token WHEN check if loggedin THEN an error is retrieved', async t => {

    const req = {headers: {authorization: 'Bearer token.token.token'}}
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'isTokenCorrect');
    mFun.returns(false)

    await validationController.allowIfLoggedin(req, res, next)

    status.calledWith(401).should.not.ok
    t.pass('check it returns 401 Unauthorize')
})


t.test('GIVEN a valid token WHEN check if loggedin THEN it pass correctly', async t => {

    const req = {headers: {authorization: 'Bearer token.token.token'}}
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'isTokenCorrect');
    mFun.returns(true)

    await validationController.allowIfLoggedin(req, res, next)

    t.ok(req.token)
    t.pass('check it passes with the correct token')
})



// can access



t.test('GIVEN a token without role WHEN it tries to access a resource THEN an error is retrieved', async t => {

    const req = { token: 'token.token.token' }
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'getIdAndRole');
    mFun.throws()

    await validationController.canAccess('readAny', 'profile')(req, res, next)

    status.calledWith(401).should.not.ok
    t.pass('check it returns 401 Unauthorize')
})


t.test('GIVEN a request without authrization WHEN it tries to access a resource THEN an error is retrieved', async t => {

    const req = { token: 'token.token.token' }
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'getIdAndRole');
    mFun.returns('user')

    const mFun2 = sinon.stub(accessService, 'canAccess');
    mFun2.returns(false)

    await validationController.canAccess('readAny', 'profile')(req, res, next)

    status.calledWith(401).should.not.ok
    t.pass('check it returns 401 Unauthorize')
})


t.test('GIVEN a normal user with valid token WHEN it tries to access other resources THEN an error is thrown', async t => {

    const req = { params: {id: "1"}, headers: {authorization: 'Bearer token.token.token'}}
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'getIdAndRole');
    mFun.returns({id: "2", role: "user"})

    const mFun2 = sinon.stub(accessService, 'canAccess');
    mFun2.returns(false)

    await validationController.canAccess('readAny', 'profile')(req, res, next)

    t.pass('check it passes with the correct token')
})


t.test('GIVEN a normal user with valid token WHEN it tries to acces its own resource THEN it pass correctly', async t => {

    const req = { params: {id: "1"}, headers: {authorization: 'Bearer token.token.token'}}
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'getIdAndRole');
    mFun.returns({id: "1", role: "user"})

    const mFun2 = sinon.stub(accessService, 'canAccess');
    mFun2.returns(false)

    await validationController.canAccess('readAny', 'profile')(req, res, next)

    t.pass('check it passes with the correct token')
})


t.test('GIVEN an admin with valid token WHEN it tries to access a resourceTHEN it pass correctly', async t => {

    const req = {params: {id: "1"}, headers: {authorization: 'Bearer token.token.token'}}
    const next = () => {};

    const mFun = sinon.stub(tokenService, 'getIdAndRole');
    mFun.returns({id: "2", role: "user"})

    const mFun2 = sinon.stub(accessService, 'canAccess');
    mFun2.returns(true)

    await validationController.canAccess('readAny', 'profile')(req, res, next)

    t.pass('check it passes with the correct token')
})

