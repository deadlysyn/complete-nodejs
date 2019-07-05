// Object property shorthand

const name = 'me'
const userAge = 42

const user = {
  name,
  age: userAge,
  location: 'The Moon',
}

console.log(user)

// Object destructuring

const product = {
  label: 'notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
}

// const label = product.label
// const stock = product.stock

const { label: productLabel, stock, rating = 2 } = product
console.log(productLabel, stock, rating)

// will throw if product is undefined (can't unpack)
const tx = (type, { label, stock }) => {
  console.log(type, label, stock)
}
tx('order', product)

// default values can be provided when unpacking
// default empty object prevents exception when product undefined
const tx2 = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock)
}
tx2('order', product)
tx2('order')
