const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET || 'longRandomSecretUsedOnlyInDev'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// use methods to define instance methods
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, secret)
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}

// use statics to define methods on the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

// hash plaintext password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
