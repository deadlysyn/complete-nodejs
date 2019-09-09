const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (value.toLowerCase() === 'password') {
        throw new Error('Password can not be "password"')
      }
    }
  }
})

// const me = new User({
//   name: 'Foo',
//   email: 'foo@dom2.com',
//   password: 'w00tw00t'
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log(error.message)
// })

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const task = new Task({
//   description: 'take out trash',
// })

// task.save().then(() => {
//   console.log(task)
// }).catch((e) => {
//   console.log(e.message)
// })
