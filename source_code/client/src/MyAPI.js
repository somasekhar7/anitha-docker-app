import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './Weather.css';

const APIdemo = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/weather`, { 
                params: { city, country } 
            });
            if (response.data) {
                setWeather(response.data);
                setError(false);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const navigate = useNavigate();
    const myIS = {
        color: "white",
    };
    return(
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'purple' }}>
                <button className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginLeft: '4px' }} onClick={() => navigate("/")}>
                    Home
                </button>
                <div className="container-fluid d-flex justify-content-center">
                    <h1 style={myIS}>API PAGE</h1>
                </div>
                <div className="d-flex">
                    <button className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }} onClick={() => navigate("/Myprofile")}>
                        Profile
                    </button>
                    <button className="btn btn-danger ml-2" style={{ backgroundColor: 'orange' ,marginRight: '4px' }} onClick={() => navigate("/Myadd")}>
                        Addition
                    </button>
                    <button className="btn btn-danger mr-3" style={{ backgroundColor: 'orange' ,marginRight: '8px' }} onClick={() => navigate("/MyInventory")}>
                        Inventory
                    </button>
                </div>
            </nav>
            <div style={{ backgroundColor: 'purple'}} className="weather-container">
            <header className="App-header">
                <h1 align="center" style={myIS}>WEATHER DATA</h1>
               
            </header>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City[Ex:Boston,Memphis]"
                style={{ backgroundColor: 'orange'}}
            />
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country (optional)"
                style={{ backgroundColor: 'orange'}}
            />
            <button style={{ backgroundColor: 'orange'}} onClick={fetchWeather}>Get Weather</button>
            {error && <div className="error-message">City not found. Please enter a valid city.</div>}
            {weather && !error && (
                <div className="weather-details">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>{weather.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                    <p>{weather.main.temp}°C</p>
                </div>
            )}
        </div>
    </div>
    );
};
export default APIdemo;

