


//short date function for displaying date

const shortDate = (dt) => {
  let dateObject = new Date(dt * 1000)
  let humanDateFormat = dateObject.toLocaleString()
  let sdate = dateObject.toLocaleString("en-US", { weekday: "long" }) + ", " + dateObject.toLocaleString("en-US", { month: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { day: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { year: "numeric" })
  return sdate
}




const mainFunction = event => {
  event.preventDefault()

  
  


//current weather

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('search').value}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
    .then(res => {
      let storage = JSON.parse(localStorage.getItem('history')) || []
      if (storage.indexOf(res.data.name)=== -1){
        storage.push(res.data.name)
        localStorage.setItem('history', JSON.stringify(storage)) 

      }
      const weather = res.data
      console.log(weather)
      const lon = weather.coord.lon
      const lat = weather.coord.lat

      document.getElementById('date').innerHTML = `${shortDate(weather.dt)}`
      document.getElementById('cityLocation').innerHTML = `${weather.name}`
      document.getElementById('conditions').innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'> ${weather.weather[0].description}`
      document.getElementById('temp').innerHTML = `${weather.main.temp}`
      document.getElementById('hum').innerHTML = `${weather.main.humidity}`
      document.getElementById('wndSpd').innerHTML = `${weather.wind.speed}`
      
//5 day forcast loop
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
        .then(res => {
          const forcast = res.data
          console.log(forcast)

          for (let i = 1; i < 6; i++) {
              
            let forcastElem = document.createElement('div')
            forcastElem.className = 'forcastcol'
            console.log(forcast.daily[i].dt)
            forcastElem.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${shortDate(forcast.daily[i].dt)}</h5>
    
    <img src = 'http://openweathermap.org/img/wn/${forcast.daily[i].weather[0].icon}.png'> 
    <h6 class="card-subtitle mb-2 text-muted">Max Temp: ${forcast.daily[i].temp.max}&degF</h6>
    <h6 class="card-text">Min Temp: ${forcast.daily[i].temp.min}&degF</h6>
    <h6 class="card-text">Humidity: ${forcast.daily[i].humidity}%</h6>
    <h6 class="card-text">UV index: ${forcast.daily[i].uvi}</h6>
    <button type="button" id="uvInd" class="btn btn-primary">UV<span class="badge"></span></button>
    
    
  </div>
</div>
     
`
            
            
            document.getElementById('row2').append(forcastElem)
          }
          //uv index badges change color accordingly
          if (forcast.daily.uvi >= 0 && forcast.daily.uvi < 3) {
            document.getElementById('uvInd').classList.add('bg-success')
          } else if (forcast.daily.uvi >= 3 && forcast.daily.uvi < 6) {
            document.getElementById('uvInd').classList.add('bg-warning')
          } else if (forcast.daily.uvi >= 6 && forcast.daily.uvi < 9) {
            document.getElementById('uvInd').classList.add('bg-danger')
          } else {
            document.getElementById('uvInd').classList.add('bg-dark')
          }
        })
        .catch(err => console.error(err))
      
})
  .catch(err => console.error(err))
  document.getElementById('search').value = ''
}
document.getElementById('searchBtn').addEventListener('click', mainFunction)

//local storage
let history = JSON.parse(localStorage.getItem('history')) || []

document.getElementById('historyBtn').addEventListener('click', event => {
  event.preventDefault()
  let storage = JSON.parse(localStorage.getItem('history')) || []
  document.getElementById('searchHistory').innerHTML= ''
  storage.forEach(item =>{
    let li = document.createElement('li')
    li.textContent = item
    li.onclick = mainFunction
    document.getElementById('searchHistory').append(li)
  })
})
// clear history
document.getElementById('clearHistory').addEventListener('click', event => {
  event.preventDefault()
  const clrHst = confirm('Are you sure you want to clear your history?')
  if (clrHst) {
    localStorage.removeItem('history')
    history = []
  }
})








