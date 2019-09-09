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

db.collection('tasks').deleteOne({
    _id: new ObjectID('5d4cef9b3635d2efabf17b77')
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

  // db.collection('users').deleteMany({
  //   age: 27
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

})
