// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('This is success!') // success
//     reject('This is my error!') // error
//   }, 2000)
// })

// doWorkPromise.then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

add(1, 1).then((sum) => {
  console.log(sum)
  return add(sum, 4)
}).then((sum2) => {
  console.log(sum2)
}).catch((e) => {
  console.log(e.message)
})
