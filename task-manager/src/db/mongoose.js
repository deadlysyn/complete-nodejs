const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

// const me = new User({
//   name: 'Mike',
//   age: 40
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log(error.message)
// })

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const task = new Task({
  description: 'take out trash',
  completed: false
})

task.save().then((task) => {
  console.log(task)
}).catch((e) => {
  console.log(e.message)
})
