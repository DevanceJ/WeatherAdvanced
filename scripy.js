let nameC = document.querySelector('.searchTerm')
let submit = document.querySelector('.searchButton')
let weatImg = document.querySelector('.weatherImg')
let mainTemp = document.querySelector('.tempCont')
let imgCity = document.querySelector('.cityImg')
let wind = document.querySelector('.wind')
let dir = document.querySelector('.dir')
let rise = document.querySelector('.rise')
let set = document.querySelector('.set')
let humidity = document.querySelector('.humid')
let visi = document.querySelector('.visib')
let uv = document.querySelector('.uv')
let tom = document.querySelector('.tom')
let dat = document.querySelector('.dat')
let img1 = document.querySelector('.t1')
let img2 = document.querySelector('.t2')


// const imageApi = {
//     method = 'GET',
//     headers
// }
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '49239ed133msh6c7dae2d7a7275dp1172a5jsn7f7be749fe83',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

submit.addEventListener('click',output)
nameC.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        output()
    }
})

function output(e){
    let city = nameC.value
    let res = city.toLowerCase()
    const main = async ()=>{
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`
        const repo = await fetch(url,options)
        const data = await repo.json()
        dom(data)
    }

    const imgApi = async ()=>{
        const url = `https://api.unsplash.com/search/photos/?query=${res}&per_page=9&client_id=669JBpZdnbLKpS27cjC1lZ6r8w5bO20k1MRZR3ypkdM`
        const repo = await fetch(url)
        const api = await repo.json()
        console.log(api)
        updateI(api)
    }
    main()
    imgApi()

    // const dayNight = ()=>{
    //     const date = new Date()
    //     const hour = date.getHours()

    //     // if (hour >= 6 && hour <= 19) {
    //     //     document.body.style.backgroundColor = '#1B2430'
    //     //     document.body.style.color = '#4E9F3D'
    //     // }
    // }
    // dayNight()
}


const dom = (data)=>{
    if (data.current.precip_mm > 0) {
        weatImg.innerHTML = `<img src="images/rain.png" alt="Raining" width="250px" height="250px">`
    }
    else{
        weatImg.innerHTML = `<img src="images/clear.png" alt="Clear Weather" width="250px" height="250px">`
    }
    // weatImg.innerHTML = `<img src="${data.current.condition.icon}" alt="Raining" width="150px" height="150px">`
    mainTemp.innerHTML = ` <h1 class = "tempM">${data.current.temp_c}<sup>°C</sup></h1>
    <br>
    <h3>${data.location.localtime}</h3>
    <br>
    <h4>${data.current.condition.text}</h4>`
    //wind box
    wind.textContent = `${data.current.wind_kph} km/h`
    dir.textContent = ` ${data.current.wind_dir}`
    //sunset box
    rise.textContent = ` ${data.forecast.forecastday[0].astro.sunrise}`
    set.textContent = ` ${data.forecast.forecastday[0].astro.sunset}`
    //hum box
    humidity.textContent = `${data.current.humidity}%`
    //visibility box
    visi.textContent = `${data.current.vis_km} km`
    //Uv box
    uv.textContent = `${data.current.uv}`

    //Week box
    //tom
    let tomD1 = data.forecast.forecastday[1].day.maxtemp_c
    let tomMax = Number(tomD1)
    let tomD2 = data.forecast.forecastday[1].day.mintemp_c
    let tomMin = Number(tomD2)
    tom.innerHTML = ` <h4>${Math.floor(tomMax)}° <span class="low">${Math.floor(tomMin)}°</span></h4>`
    //Dat
    let datD1 = data.forecast.forecastday[2].day.maxtemp_c
    let datMax = Number(datD1)
    let datD2 = data.forecast.forecastday[2].day.mintemp_c
    let datMin = Number(datD2)
    dat.innerHTML = ` <h4>${Math.floor(datMax)}° <span class="low">${Math.floor(datMin)}°</span></h4>`

    img1.innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" width="50px" height="50px">`
    img2.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" width="50px" height="50px">`
}

const updateI = (api)=>{
   imgCity.innerHTML = `<img src="${api.results[0].urls.raw}" style="width: 360px; height: 150px; border-radius: 8px; margin-top: 90px;"></img>`
}