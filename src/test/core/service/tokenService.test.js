const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');
const jwt = require('jsonwebtoken');



t.afterEach(() => {
    delete process.env.JWT_SECRET;
});

t.test('Create new token', async t => {
    const user = new User(
        username = 'user',
        password = 'user',
        firstName = 'Carmine',
        lastName = 'Verdi',
        role = 'User'
    )

    delete process.env.JWT_SECRET;

    t.test(
        'the token is valid',
        async t => t.ok(tokenService.sign(user))
    )
})

t.test('Create new token with .env secret', async t => {
    const user = new User(
        username = 'user',
        password = 'user',
        firstName = 'Carmine',
        lastName = 'Verdi',
        role = 'User'
    )

    process.env.JWT_SECRET = 'test-secret';

    t.test(
        'the token is valid',
        async t => t.ok(tokenService.sign(user))
    )
})


t.test('Check for token validity', async t => {
    process.env.JWT_SECRET = 'test-secret';
    const token = jwt.sign({id: "1"}, 'test-secret', {expiresIn: "1d"});
    t.test(
        'the token is correct',
        async t => t.equal(await tokenService.isTokenCorrect(token), true)
    )
})

t.test('Check for token validity', async t => {
    process.env.JWT_SECRET = 'test-secret';
    const token = jwt.sign({id: "1"}, 'test-secret', {expiresIn: "1s"});
    const mFun = sinon.stub(jwt, "verify");
    mFun.throws()
    t.test(
        'the token is not correct',
        async t => t.equal(await tokenService.isTokenCorrect(token), false)
    )
})