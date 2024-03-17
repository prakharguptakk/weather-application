import React, { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [searchData, setSearchData] = useState([]);

  // const url =
    // "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=731d3921ad3e3437f57d452c668fa2cb";
  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const { data } = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${location}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "3bfdbc5059msh05bd2403548e75bp1d939bjsn5868540d4f83",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      setSearchData(data.data);
      setLocation("");
    }
  };

  const fetchData = (data) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=731d3921ad3e3437f57d452c668fa2cb`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
    setSearchData([]);
  };

  const kToC = (temp) => {
    let c = temp - 273;
    return c;
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="data-list">
        {searchData?.map((data) => (
          <div className="list-item" key={data.wikiDataId}>
            <button
              onClick={() => {
                fetchData(data);
              }}
            >
              <h2>{data.city}</h2>
              <p>{data.country}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{kToC(data.main.temp).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{kToC(data.main.feels_like).toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
