
import { useEffect, useState } from 'react'
import countryService from './services/countries'




const Show_countries = ({countries}) => {
  if (countries.length === 1){
    return (
      <>
        {countries.map(country => (
          <>
            <h1>{country.name.common}</h1>
            
            <p style={{fontSize: '14px'}}>Capital: {country.capital}</p>
            <p style={{fontSize: '14px'}}>Area: {country.area} m2</p>

            <p><b>Languages</b></p>
            <ul>
            {Object.entries(country.languages).map(([code, name]) => {
              return <li key={code}>{name}</li>
            })}
          </ul>
          
            <p>Flag: {country.flag}</p>
            

            
          </>
        ))}
      </>
    )
  }
  return (
    <table>
      <tr>
        <th>Country</th>
      </tr>
      {countries.map(country => (
        <tr key={country.name.common}>
          <td>{country.name.common}</td>
        </tr>
      ))}
    </table>
  )
}

function App() {
  
  const [countries,setCountries] = useState([])
  const [filterCountry,setFilter] = useState('')

  useEffect(()=> {
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
      console.log(countries)

    })
  },[])

  const handleFilterChange = (event) => {
    const clearState = () => {
      setCountries([]);
      setFilter('');
    }
    event.preventDefault()
    setFilter(event.target.value)
    if(event.target.value !== '') {
        countryService
        .get_with_name(event.target.value)
        .then(filteredCountries => {
          setCountries(filteredCountries)
        })
    } else {
        clearState();
    }
  }


  return (
    <div>
      <h2>Countries</h2>
      <div>name: <input value={filterCountry} onChange={handleFilterChange} /></div>
      {countries.length === 1 ? <Show_countries countries={countries}/> : filterCountry !== "" ? <Show_countries countries={countries}/> : <p>No countries found</p>}
    </div>
  )
}

export default App;
