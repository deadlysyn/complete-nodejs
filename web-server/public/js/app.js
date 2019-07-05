const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(({ error, address, forecast, location } = {}) => {
      if (error) {
        return console.log(error)
      }
      console.log(`${location}: ${forecast}`)
    })
  })
})
