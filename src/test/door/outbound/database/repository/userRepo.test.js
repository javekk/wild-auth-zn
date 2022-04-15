const appRoot = require('app-root-path');
const t = require('tap');
const userRepo = require(appRoot + '/src/main/door/outbound/database/repository/userRepo.js');

t.test('Get all users correctly', async t => {

  const users = await userRepo.getAll()

  t.test(
    'check size',
    async t => t.equal(users.length, 4)
  )
  t.test(
    'check no one has the password exposed',
    async t => t.ok(users.some(u => !u.password))
  )
})


t.test('GIVEN an existing user id THEN the user is retrieved correctly', async t => {

  const user = await userRepo.getById(1)

  t.test(
    'check it is retrieved correctly',
    async t => t.ok(user)
  )
  t.test(
    'check no one has the password exposed',
    async t => t.ok(!user.password)
  )
})


t.test('GIVEN a NOT existing user id THEN null is retrieved', async t => {

  const user = await userRepo.getById(0)

  t.test(
    'check it is null',
    async t => t.notOk(user)
  )
})


t.test('GIVEN a new user object THEN it is persisted correctly', async t => {

  const newUser = {
      username: 'user',
      password: 'user',
      firstName: 'Fury',
      lastName: 'Gandalf',
      role: 'User',
  }
  const createdUser = await userRepo.createUser(newUser)

  t.test(
    'check it is not null',
    async t => t.ok(createdUser)
  )
  const id = createdUser.id
  t.test(
    'check id is not null',
    async t => t.ok(id)
  )
  const retrievedUser = await userRepo.getById(id)
  t.test(
    'check it is now retrivable',
    async t => t.ok(retrievedUser)
  )
})