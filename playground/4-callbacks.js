// experimenting with callbacks

// async from node
// setTimeout(() => {
//   console.log('two seconds are up')
// }, 2000)

// sync from js
// const names = ['mike', 'annie', 'madeline']
// const shortNames = names.filter(name => name.length <= 5)
// console.log(shortNames)

// callback pattern
// const geocode = (address, callback) => {
//   setTimeout(() => {
//     // from mapping api...
//     const data = {
//       longitude: 0,
//       latitude: 0,
//     }
//     callback(data)
//   }, 2000)
// }

// const data = geocode('Philadelphia', data => {
//   console.log(data)
// })

// const add = (x, y, callback) => {
//   setTimeout(() => {
//     callback(x + y)
//   }, 2000)
// }

// add(1, 4, sum => {
//   console.log(sum) // Should print: 5
// })

const doWorkCallBack = (callback) => {
  setTimeout(() => {
    // callback('This is my error!', undefined)
    callback(undefined, 'This is success!')
  }, 2000)
}

doWorkCallBack((error, result) => {
  if (error) {
    return console.log(error)
  }
  console.log(result)
})
