// CRUD with node and mongodb

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// original url parser being deprecated
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  const db = client.db(databaseName)

  // db.collection('users').findOne({_id: new ObjectID('5d71d71fc1154f33ab108e50')}, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })

  // db.collection('users').find({age: 42}).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({age: 42}).count((error, count) => {
  //   console.log(count)
  // })

  db.collection('tasks').findOne({_id: new ObjectID('5d4cef9b3635d2efabf17b77')}, (error, task) => {
    if (error) {
      return console.log(error)
    }
    console.log(task)
  })

  db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    if (error) {
      return console.log(error)
    }
    console.log(tasks)
  })
})
