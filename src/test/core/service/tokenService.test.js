const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const {
    User
} = require(appRoot + '/src/main/core/domain/user');
const tokenService = require(appRoot + '/src/main/core/service/tokenService');


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
