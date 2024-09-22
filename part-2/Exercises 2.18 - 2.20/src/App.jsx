import { useState } from 'react'
import axios from 'axios'
import {Countries, CountryInfo} from './components/Countries.jsx'
import CountryInput from './components/CountryInput.jsx'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const App = () => {
  const [filter, setFilter] = useState('')
  const [shownCountries, setShownCountries] = useState([])
  const [nameList, setNameList] = useState([])
  const [countryInfo, setCountryInfo] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
  let countryNames = []

  const handleInput = (event) => {
    const input = event.target.value
    setFilter(input)

    if (nameList.length === 0) {
      setShownCountries('Retrieving country list...')
      axios
        .get(`${baseUrl}/all`)
        .then(response => {
          countryNames = response.data.map(a => a.name)
          setNameList(countryNames)
          setShownCountries('List retrieved!')
        })
    }
    else {
      let filteredCountries = nameList.filter((name) => countryFilter(input, name))

      if (filteredCountries.length > 10) {
        setShownCountries('Too many matches, specifiy another filter')
        setCountryInfo(null)
        setWeatherInfo(null)
      }
      else if (filteredCountries.length === 1) {
        const countryName = filteredCountries[0].common.toLowerCase()
        axios
          .get(`${baseUrl}/name/${countryName}`)
          .then(response => {
            setCountryInfo(response.data)

            axios
              .get(`https://api.weatherbit.io/v2.0/current?lat=${response.data.latlng[0]}&lon=${response.data.latlng[1]}&key=${WEATHER_API_KEY}`)
              .then(response => {
                setWeatherInfo(response.data.data[0])
              })

          })

        setShownCountries('')
      }
      
      else {
        setShownCountries(filteredCountries)
        setCountryInfo(null)
        setWeatherInfo(null)
      }
    }
  }

  const countryFilter = (input, nameObject) => {
    for (let key in nameObject) {
      let value = nameObject[key]

      if ((typeof value === 'string') && (value.toLowerCase().includes(input.toLowerCase()))) {
        return true
      }

      else if (value instanceof Object) {
        let nestedName = countryFilter(input, value)
        if (nestedName) return true
      }

    }
    return false
  }

  const handleClick = (event) => {
    const countryName = event.target.name
    axios
      .get(`${baseUrl}/name/${countryName}`)
      .then(response => {
        setCountryInfo(response.data)
        
        axios
        .get(`https://api.weatherbit.io/v2.0/current?lat=${response.data.latlng[0]}&lon=${response.data.latlng[1]}&key=${WEATHER_API_KEY}`)
        .then(response => {
          setWeatherInfo(response.data.data[0])
        })

      })
  }
  
  let displayCountry
  if ((countryInfo) && (shownCountries.length == 0)) {
    displayCountry = <CountryInfo countryName={countryInfo.name.common} countryInfo={countryInfo} weatherInfo={weatherInfo} />
  }
  else {
    displayCountry = <></>
  }

  return(
    <div>
    <CountryInput value={filter} onChange={handleInput} />
    <Countries value={shownCountries} onClick={handleClick} countryInfo={countryInfo} weatherInfo={weatherInfo} />
    {displayCountry || 1}
    </div>
  )
}

export default App