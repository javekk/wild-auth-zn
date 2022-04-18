const appRoot = require('app-root-path');
const t = require('tap');
const sinon = require("sinon");
const accessService = require(appRoot + '/src/main/core/service/accessService');



t.test('I am a simple user and I want to access resources', async t => {

    t.test(
        'I can mind my own business',
        async t => t.ok(accessService.canAccess('User', 'readOwn', 'profile'))
    )

    t.test(
        'I should mind my own business',
        async t => t.notOk(accessService.canAccess('User', 'readAny', 'profile'))
    )

    t.test(
        'I can take care of my own business',
        async t => t.ok(accessService.canAccess('User', 'updateOwn', 'profile'))
    )

    t.test(
        'I should not take care of any other business',
        async t => t.notOk(accessService.canAccess('User', 'updateAny', 'profile'))
    )
})


t.test('I am an admin and I want to access resources', async t => {

    t.test(
        'I can mind my own business',
        async t => t.ok(accessService.canAccess('Admin', 'readOwn', 'profile'))
    )

    t.test(
        'I can mind my own business and other s',
        async t => t.ok(accessService.canAccess('Admin', 'readAny', 'profile'))
    )

    t.test(
        'I can take care of my own business',
        async t => t.ok(accessService.canAccess('Admin', 'updateOwn', 'profile'))
    )

    t.test(
        'I should not take care of any other business',
        async t => t.notOk(accessService.canAccess('Admin', 'updateAny', 'profile'))
    )
})




t.test('I am a superadmin and I want to access resources', async t => {

    t.test(
        'I can mind my own business',
        async t => t.ok(accessService.canAccess('Superadmin', 'readOwn', 'profile'))
    )

    t.test(
        'I can mind my own business and other s',
        async t => t.ok(accessService.canAccess('Superadmin', 'readAny', 'profile'))
    )

    t.test(
        'I can take care of my own business',
        async t => t.ok(accessService.canAccess('Superadmin', 'updateOwn', 'profile'))
    )

    t.test(
        'I can take care of any other business',
        async t => t.ok(accessService.canAccess('Superadmin', 'updateAny', 'profile'))
    )

    t.test(
        'I can delete whatever I want',
        async t => t.ok(accessService.canAccess('Superadmin', 'deleteAny', 'profile'))
    )
})