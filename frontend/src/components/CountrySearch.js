import React, { useState, useEffect } from 'react'
import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Link } from 'react-router-dom'



const CountrySearch = () => {

  // const [data, setData] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [isHidden, setHidden] = useState(true)

  //create an array of all available countries 
  const [countriesArr, setCountriesArr] = useState([])
  useEffect(() => {
    fetch('/api/spots')
      .then(resp => resp.json())
      .then(resp => {
        // setData(resp)
        getUnique(resp)
        setHidden(true)
        // console.log('is hidden init', isHidden)
        // console.log('countryFilter', countryFilter)
      })
    return () => console.log('Unmounting component')
  }, [])

  function getUnique(data) {
    const countries = []
    data.map((elem) => countries.push(elem.country))
    const unique = [...new Set(countries)]
    setCountriesArr(unique)
  }

  const filter = (e) => {
    console.log(e.target.value)
    setCountryFilter(e.target.value)
    // check each time something is entered into the the search field
    toggleVisibility(e.target.value)
  }

  // if countryFilter state is empty setHidden as true
  const toggleVisibility = (val) => val ? setHidden(false) : setHidden(true)

  return (
    <Element name="test1"  className="element">
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            id='search-input'
            placeholder='Search a country...'
            name='query'
            onChange={filter.bind(this)}
            id="search-bar"
          />
        </div>
      </div>
      {countriesArr
        .filter(elem => {
          return elem.toLowerCase().includes(countryFilter.toLowerCase())
        })
        .map((country, i) => {
          return (
            <Link key={i} to={`/spots/countries/${country.toLowerCase()}`}>
              <li className="country-list" style={{
                listStyleType: 'none',
                //if is hidden is true then display none, else if something is in the filter filed display
                display: isHidden ? 'none' : 'block',
                fontSize: '30px'
              }}
              value={country}>{country}
              </li>
            </Link>
          )
        })
      }
    </Element>
  )
}
export default CountrySearch