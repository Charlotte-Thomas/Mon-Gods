import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const intitalForcastData = {
  swellDirection: [],
  waveHeight: [],
  windSpeed: [],
  waterTemperature: [],
  waveDirection: [],
  swellPeriod: []
}

const ForecastChart = ({ lat, lon }) => {

  const [forecastData, setForecastData] = useState(intitalForcastData)

  const [latt, setLatt] = useState('')
  const [lonn, setLonn] = useState('')

  const [swellDirection, setSwellDirection] = useState()

  const [loading, setLoading] = useState(false)

  console.log('forecastData', forecastData)

  const averageSwellPeriod = (forecastData.swellPeriod.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.swellPeriod.length
  // console.log('swellPeriod arr AVERAGE',averageSwellPeriod)

  const averageWaveHeight = (forecastData.waveHeight.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.waveHeight.length
  // console.log('waveHeight arr AVERAGE',averageWaveHeight)

  const averageWindSpeed = (forecastData.windSpeed.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.windSpeed.length
  // console.log('windSpeed arr AVERAGE',averageWindSpeed)

  const averageWaterTemperature = (forecastData.waterTemperature.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.waterTemperature.length
  // console.log('waterTemperature arr AVERAGE',averageWaterTemperature)

  const averageWaveDirection = (forecastData.waveDirection.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.waveDirection.length
  // console.log('waveDirection arr AVERAGE',averageWaveDirection)

  const averageSwellDirection = (forecastData.swellDirection.map(x => x.value)).reduce((a, b) => a + b, 0) / forecastData.swellDirection.length
  // console.log('swellDirection arr AVERAGE',averageSwellDirection)

  useEffect(() => {
    getForecast(lat, lon)
  }, [lat, lon])


  function swellDirectionSet() {
    setSwellDirection(forecastData.swellDirection)
  }

  function getForecast(lat, lon) {
    fetch(`https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lon}&params=waveHeight,waveDirection,swellDirection,waterTemperature,windSpeed,windDirection,swellPeriod`, {
      headers: {
        // SWITCH THROUGH THESE WHEN API CALLS REQUEST LIMIT REACHED
        // 'Authorization': 'b8804aa6-1ad4-11ea-a93c-0242ac130002-b8804bdc-1ad4-11ea-a93c-0242ac130002'
        // 'Authorization': '6e9efd2c-1847-11ea-8553-0242ac130002-6e9f0042-1847-11ea-8553-0242ac130002'
        // 'Authorization': 'd54eb8a4-1c03-11ea-afbb-0242ac130002-d54eb9c6-1c03-11ea-afbb-0242ac130002'
        'Authorization': '90dc9ef0-1c41-11ea-a453-0242ac130002-90dca008-1c41-11ea-a453-0242ac130002'
      }
    })
      .then(resp => resp.json())
      .then(resp =>
        setForecastData(resp.hours[0])
        // setSwellDirection(resp.hours[0].swellDirection)
      )
      .then(swellDirectionSet())
    console.log('FOREEEECASSSTTT DATAA', forecastData)
  }

  return (
    <div id='forecast-charts'>
      <div className="columns">
        <div className="column">
          <p>Swell Period</p>
          <CircularProgressbar className='progress-bar' value={averageSwellPeriod} minValue={0} maxValue={30} text={`${averageSwellPeriod.toFixed(2)}s`} />
        </div>
        <div className="column">
          <p>Wave Height</p>
          <CircularProgressbar className='progress-bar' value={averageWaveHeight} minValue={0} maxValue={35} text={`${averageWaveHeight.toFixed(2)}m`} />
        </div>
        <div className="column">
          <p>Wind Speed</p>
          <CircularProgressbar className='progress-bar' value={averageWindSpeed} minValue={0} maxValue={62} text={`${averageWindSpeed.toFixed(2)}m/s`} />
        </div>
        <div className="column">
          <p>Water Temp</p>
          <CircularProgressbar className='progress-bar' value={averageWaterTemperature} minValue={-20} maxValue={40} text={`${averageWaterTemperature.toFixed(2)}°C`} />
        </div>
        {/* <div className="column">
                <p>Wave Direction</p>
                <CircularProgressbar value={averageWaveDirection} minValue={-5} maxValue={40} text={`${averageWaveDirection.toFixed(0)}°C`} />
            </div> */}
        <div className="column">
          <p>Swell Direction</p>
          <CircularProgressbar className='progress-bar' value={averageSwellDirection} minValue={-5} maxValue={40} text={`${averageSwellDirection.toFixed(0)}°C`} />
        </div>
      </div>
    </div>
  )
}

export default ForecastChart
