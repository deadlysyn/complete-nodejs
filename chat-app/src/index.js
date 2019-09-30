const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const documentRoot = path.join(__dirname, '../public')

app.use(express.static(documentRoot))

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
