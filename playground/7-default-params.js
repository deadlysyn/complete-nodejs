const greeter = (name = 'anon', age) => {
  console.log(`Hello ${name}`)
}

greeter('me') // Hello me
greeter() // Hello anon
