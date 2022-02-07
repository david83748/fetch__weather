const xhr = new XMLHttpRequest();

const promise = new Promise ((resolve) => {
    xhr.open("GET", "https://api.weatherapi.com/v1/current.json?key=b677082ac19f45aca07212645220401&q=Kiev&aqi=no");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) return;
        
        resolve(JSON.parse(xhr.response));
    }
});


promise.then(data => render(data))

const render = ({location:{name, region, country, localtime}, current: {gust_kph, last_updated, temp_c, temp_f, condition:{icon, text}, wind_mph, wind_kph, humidity, cloud}}) => {
    document.getElementById('wrapper').insertAdjacentHTML(
      'beforeend',
      `
        <div class="main">
        
        <div class="main__item">
        <div>Location: ${name}<div>
        <div>Region: ${region}<div>
        <div>Country: ${country}</div>
        <div>Localtime: ${localtime}</div>
        <div>
        
        <hr>
        
        <div class="main__item">
        <div>Gust: ${gust_kph} kph</div>
        <div>Last updated: ${last_updated}</div>
        <div>Сurrent temperature: ${temp_c}°C</div>
        <div>Сurrent temperature: ${temp_f}°F</div>
        <div>
        
        <hr>
        
        <div class="main__item">
        <div><img src="${icon}" alt="rain"></div>
        <div>${text}</div>
        <div>
        
        <hr>
        
        <div class="item">
        <div>Wind: ${wind_mph}mph</div>
        <div>Wind: ${wind_kph} kph</div>
        <div>Humidity: ${humidity}%</div>
        <div>Cloud: ${cloud}%</div>
        <div>
        
        <div>
        
        `,
    );
  };

xhr.send();