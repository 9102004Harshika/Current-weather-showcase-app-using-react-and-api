import React, { useEffect, useState } from 'react'
import './css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faStreetView} from "@fortawesome/free-solid-svg-icons"
import { faSun } from '@fortawesome/free-solid-svg-icons'

const Tempapp = () => {
  const[city,setCity]=useState(null);
  const[country,setCountry]=useState(null);
  const[search,setSearch]=useState("Mumbai");
  const[time,setTime]=useState(null);
 

  

  const str2 = search.charAt(0).toUpperCase() + search.slice(1);
  useEffect(()=>{
    const fetchApi=async()=>{
      const url=`https://api.weatherapi.com/v1/current.json?key=69069e30dd1c4c5ba2163054230303&q=${search}&aqi=no`
     const response=await fetch(url);
     const resJson= await response.json();
     console.log(resJson)
    setCity(resJson.current)
    setCountry(resJson.location.country)
    setTime(resJson.location.localtime)
    
    }
    fetchApi();

  },[search])
  return (
    <>
    <div className='box'>
        <div className='inputData'>
            <input type="search" value={search}className='inputField' onChange={(event)=>{setSearch(event.target.value)}}/>
        
    </div>
    {
      !city ? (
        
        <h1 className='errorMsg'>No such city found</h1>
      
      ):(
        
        <div>
       
        <h2 className='location'>{city.condition.text}</h2>
        <img src={city.condition.icon} />
        <div className='info'>
        <h2 className='location'>
        <FontAwesomeIcon icon={faStreetView}></FontAwesomeIcon>&nbsp;{str2},{country.slice(0,2)}<br></br>
       
        </h2>
        <br></br>
        <h1 className='time'>{time}</h1>
        <h1 className='temp'>
        {city.temp_c}℃
        </h1>
        <h3 className='tempmin_max'>Celsius {city.temp_c}℃ | {city.temp_f}&#8457;</h3>
    </div>
    <div className='wave -one'></div>
    <div className='wave -two'></div>
    <div className='wave -three'></div>
    </div>
      )
    }
   
  
    </div>
    
    </>
  )
}

export default Tempapp