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

const tx = (type, { label, stock }) => {
  console.log(type, label, stock)
}
tx('order', product)
