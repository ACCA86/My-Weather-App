//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const api= {
    key:'e0dcd3b45400d1835c8c7fab24907de0',
    base:'https://api.openweathermap.org/data/2.5/'
}

const search = document.querySelector('#search'),
const btn = document.querySelector('.btn'),
img = document.querySelector('#wth-icon'),
city = document.querySelector('.city'),
temp = document.querySelector('.temp'),
num = document.querySelector('.num'),
weather = document.querySelector('.weather'),
rang = document.querySelector('.rang'),
date = document.querySelector('.date'),
conDetails = document.querySelector('#details'),
backArrow = document.querySelector('.arrow-back'),
error = document.querySelector('.error')

backArrow.addEventListener('click',()=>{
    conDetails.style.display='none';
    error.style.display='none';
})
btn.addEventListener('click',getState);

function getState(e){
    e.preventDefault();
    if(e.type == "click" || e.key === 'Enter'){
        getInput();
    }
}

function getInput(){
    axios({
        method:'get',
        url:`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`
    }).then(res =>{
        console.log(res.data);
        img.src = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        city.textContent = `${res.data.name}`
        num.textContent = `${res.data.main.temp}`
        weather.textContent = `${res.data.weather[0].main}`
        rang.textContent = `Max:${res.data.main.temp_max} / Min:${res.data.main.temp_min}`
        conDetails.style.display='flex'
        GetDate();
        
    }).catch(err =>{
            error.style.display='block';
            document.querySelector('.main-container form').style.height='190px';
            error.textContent = 'Please enter name city correctly';
            search.value = '';
        
    })
}

function GetDate(){
    let days : Array<string> = ['Sunday','Monday','Tuesdaay','Wednesday','Therday','Friday','Saturday'];
    let months : string[] = ['Jan','Feb','Mar','Apr','May','june','july','Aug','Sep','Oct','Nov','Dec'];
    let dates = new Date()
    var y = dates.getFullYear();
    var m = months[dates.getMonth()];
    var d = days[dates.getDay()];
    var currentDay = dates.getDate();

    date.textContent = `${d},${m} ${currentDay},${y}`;
}
