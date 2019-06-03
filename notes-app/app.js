const getNotes = require('./notes.js')
const validator = require('validator')
const chalk = require('chalk')

const msg = getNotes()
console.log(msg)

console.log(validator.isEmail('@gmail.com'))
console.log(validator.isURL('google.com'))

console.log(chalk.bold.inverse.green('Success!'))
