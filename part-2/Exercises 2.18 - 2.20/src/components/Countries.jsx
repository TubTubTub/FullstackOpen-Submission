const Countries = ({ value, onClick, countryInfo, weatherInfo }) => {
    if (typeof value === 'string') {
      return <p>{value}</p>
    }
    if (value.length == 0) {
      return <p>No country found!</p>
    }
    return (
        value.map(country =>
        <div key={Math.random()}>
          {country.common} <button key={country} name={country.common} onClick={onClick}>show</button>
          <CountryInfo key={country.common} countryName={country.common} countryInfo={countryInfo} weatherInfo={weatherInfo} />
        </div>
        )
    )
}

const CountryInfo = ({ countryName, countryInfo, weatherInfo }) => {
let countryDisplay, weatherDisplay
if (countryInfo == null) {
    return
}
else {
    countryDisplay = <div>
    <h1>{countryInfo.name.common}</h1>

    <p>capital {countryInfo.capital}</p>
    <p>area {countryInfo.area}</p>

    <h2>languages:</h2>
    <ul>
        {Object.values(countryInfo.languages).map((language) => <li key={language}>{language}</li>)}
    </ul>

    <img src={countryInfo.flags.svg} alt={`Flag of ${countryInfo.name.common}`} width="50%" height="50%"/>
</div>
}

if (weatherInfo == null) {
    weatherDisplay = 'Weather data loading...'
}
else {
    weatherDisplay = <div>
    <h1>Weather in {weatherInfo.city_name}</h1>
    <img src={`https://cdn.weatherbit.io/static/img/icons/${weatherInfo.weather.icon}.png`} alt={'Icon for' + weatherInfo.weather.description}/>
    <p>temperature {weatherInfo.temp} Celsius</p>
    <p>wind {Math.round((weatherInfo.wind_spd * 100)) / 100} m/s</p>
    </div>
}

if (countryName == countryInfo.name.common) {
    return (<div>
    {countryDisplay}
    {weatherDisplay}
    </div>)
}
}

export {Countries, CountryInfo}