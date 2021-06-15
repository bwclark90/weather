




const shortDate = (dt) => {
  let dateObject = new Date(dt * 1000)
  let humanDateFormat = dateObject.toLocaleString()
  let sdate = dateObject.toLocaleString("en-US", { weekday: "long" }) + ", " + dateObject.toLocaleString("en-US", { month: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { day: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { year: "numeric" })
  return sdate
}



document.getElementById('searchBtn').addEventListener('click', event => {
  event.preventDefault()
//5 day forcast
  
  


//current weather

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('search').value}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
    .then(res => {
      const weather = res.data
      console.log(weather)
      const lon = weather.coord.lon
      const lat = weather.coord.lat

      document.getElementById('date').innerHTML = `${weather.dt}`
      document.getElementById('cityLocation').innerHTML = `${weather.name}`
      document.getElementById('conditions').innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'> ${weather.weather[0].description}`
      document.getElementById('temp').innerHTML = `${weather.main.temp}`
      document.getElementById('hum').innerHTML = `${weather.main.humidity}`
      document.getElementById('wndSpd').innerHTML = `${weather.wind.speed}`
      

      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
        .then(res => {
          const forcast = res.data
          console.log(forcast)

          for (let i = 1; i < 5; i++) {


            let forcastElem = document.createElement('div')
            forcastElem.className = 'forcastcol'
            forcastElem.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${shortDate(forcast.daily[i].dt)}</h5>
    <h5 class="card-title">${forcast.daily[i].dt_txt}</h5>
    <img src = 'http://openweathermap.org/img/wn/${forcast.daily[i].weather[0].icon}.png'> 
    <h6 class="card-subtitle mb-2 text-muted">Max Temp: ${forcast.daily[i].temp.max}&degF</h6>
    <h6 class="card-text">Min Temp: ${forcast.daily[i].temp.min}&degF</h6>
    <h6 class="card-text">Humidity: ${forcast.daily[i].humidity}%</h6>
    <h6 class="card-text">UV index: ${forcast.daily[i].uvi}</h6>
    
  </div>
</div>
     
`
            document.getElementById('5dayforcast').append(forcastElem)
          }

        })
        .catch(err => console.error(err))
      
})
  .catch(err => console.error(err))
  document.getElementById('search').value = ''
})




// document.getElementById('searchBtn').addEventListener('click', event => {
//   event.preventDefault()
//   axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
//   .then(res =>{
//   const forcast = res.data
//   console.log(forcast)
// })


// })

