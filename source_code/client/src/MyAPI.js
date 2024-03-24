import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './Weather.css';

const APIdemo = () => {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false); // State to manage error message

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/weather`, { 
                params: { city, state, country } 
            });
            if (response.data.data.length > 0) {
                setWeather(response.data.data[0]);
                setError(false); // Reset error state if city found
            } else {
                setError(true); // Set error state if city not found
            }
        } catch (error) {
            console.error(error);
            setError(true); // Set error state for any error during API call
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
            <div className="weather-container">
            <header className="App-header">
                <h1 align="center">Weather Data</h1>
            </header>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
            />
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State (optional)"
            />
            <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country (optional)"
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && (
                <div className="error-message">
                    City not found. Please enter a valid city.
                </div>
            )}
            {weather && !error && (
                <div className="weather-details">
                    <h2>{weather.city_name}</h2>
                    <p>{weather.weather.description}</p>
                    <img src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt="Weather Icon" />
                    <p>{weather.temp}°C</p>
                </div>
            )}
        </div>
        </div>
    );
};
export default APIdemo;

