const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Foobah',
      email: 'foo@bah.org',
      password: 'password!'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body.user.name).toBe('Foobah')
  expect(response.body).toMatchObject({
    user: {
      name: 'Foobah',
      email: 'foo@bah.org'
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe('password!') // should be hashed
})

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
  }).expect(200)
  const user = await User.findById(response.body.user._id)
  expect(user.tokens[1].token).toEqual(response.body.token)
})

test('Should not login existing user with bad password', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'password'
  }).expect(400)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/users/login').send({
    email: 'dont@exist.com',
    password: 'aksfjskdfj'
  }).expect(400)
})

test('Should fetch user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should fail to fetch user profile', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for authenticated user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

   const user = await User.findById(userOneId)
   expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'Bazqux' })
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Bazqux')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'Bora Bora' })
    .expect(400)
})
