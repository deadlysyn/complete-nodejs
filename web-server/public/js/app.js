const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//
weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(({ error, address, forecast, location } = {}) => {
      if (error) {
        messageOne.textContent = 'Error retrieving forecast:'
        messageTwo.textContent = error
      } else {
        messageOne.textContent = `Forecast for ${location}:`
        messageTwo.textContent = forecast
      }
    })
  })
})
