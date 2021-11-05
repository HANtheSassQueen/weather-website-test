const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.style.color = 'red'
                messageOne.textContent = data.error
            }
            else {
                const time = new Date().toLocaleTimeString()
                const date = new Date().toLocaleDateString()
                messageOne.textContent = data.location
                messageTwo.textContent = 'At '+ time +' on '+ date + ', '+data.forecastData
            }
        })
    })
})