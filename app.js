


const stringDate = (dt) => {
  let dateObject = new Date(dt * 1000)
  let humanDateFormat = dateObject.toLocaleString()
  let weekDay = dateObject.toLocaleString("en-US", { weekday: "long" })
  let Time = dateObject.toLocaleString("en-US", { timeZoneName: "short" })
  return weekDay + ", " + Time
}

const shortDate = (dt) => {
  let dateObject = new Date(dt * 1000)
  let humanDateFormat = dateObject.toLocaleString()
  let sdate = dateObject.toLocaleString("en-US", { weekday: "long" }) + ", " + dateObject.toLocaleString("en-US", { month: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { day: "numeric" }) + "/" + dateObject.toLocaleString("en-US", { year: "numeric" })
  return sdate
}



document.getElementById('searchBtn').addEventListener('click', event => {
  event.preventDefault()
//5 day forcast
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
  .then(res => {
    const forcast = res.data
    console.log(forcast)
    
    for ( let i = 0; i < 5; i++) {
      
      
        let forcastElem = document.createElement('div')
        forcastElem.className = 'forcastcol'
        forcastElem.innerHTML = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${shortDate(forcast.list[i].dt)}</h5>
    <h5 class="card-title">${forcast.list[i].dt_txt}</h5>
    <img src = 'http://openweathermap.org/img/wn/${forcast.list[i].weather[0].icon}.png'> 
    <h6 class="card-subtitle mb-2 text-muted">Max Temp: ${forcast.list[i].main.temp_max}&degF</h6>
    <h6 class="card-text">Min Temp: ${forcast.list[i].main.temp_min}&degF</h6>
    <h6 class="card-text">Humidity: ${forcast.list[i].main.humidity}%</h6>
    
    
  </div>
</div>
     
`
      document.getElementById('5dayforcast').append(forcastElem)
    }
    
  })
  .catch(err => console.error(err))


  //current weather

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('search').value}&units=imperial&appid=7d550b5d9d3f2ac58186726ddd1ecd49`)
  
    .then(res => {
      const weather = res.data
      console.log(weather)

      document.getElementById('date').innerHTML = `${weather.dt}`
      document.getElementById('cityLocation').innerHTML = `${weather.name}`
      document.getElementById('conditions').innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}.png'> ${weather.weather[0].description}`
      document.getElementById('temp').innerHTML = `${weather.main.temp}`
      document.getElementById('hum').innerHTML = `${weather.main.humidity}`
      document.getElementById('wndSpd').innerHTML = `${weather.wind.speed}`
      // document.getElementById('uvIndex').innerHTML = `${weather.}`
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

