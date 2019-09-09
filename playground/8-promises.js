const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('This is success!') // success
    reject('This is my error!') // error
  }, 2000)
})

doWorkPromise.then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})
