const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// middleware should come before other app.use() calls
// maintenance mode
// app.use((req, res, next) => {
//   res.status(503).send('Temporarily in maintenance mode')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
