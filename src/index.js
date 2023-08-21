import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React, { useState, useEffect, useCallback } from "react";
// import "./App.css";

// function App() {
//   const [weather, setWeather] = useState({});
//   const [locations, setLocations] = useState("ahemdabad");

//   const fetchWeather = useCallback(() => {
//     fetch(
//       `https://api.weatherapi.com/v1/current.json?key={YOUR_WEATHERAPI_KEY}&q=${locations}&aqi=no`
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           if (res.status === 400) {
//             alert("wrong location");
//           } else {
//             alert("there is error");
//           }
//           throw new Error("Weather API error");
//         }
//       })
//       .then((data) => {
//         setWeather(data);
//       })
//       .catch((error) => console.log(error));
//   }, [locations]);

//   useEffect(() => {
//     fetchWeather();
//   }, [fetchWeather]);

//   return (
//     <div className="app">
//       <div className="wrapper">
//         <div className="search">
//           <input
//             type="text"
//             value={locations}
//             onChange={(e) => setLocations(e.target.value)}
//             placeholder="Enter location"
//             className="location_input"
//           />
//           <button className="location_searcher" onClick={fetchWeather}>
//             Search Location
//           </button>
//         </div>
//         <div className="app__data">
//           <p className="temp">
//             Current Temperature: {weather?.current?.temp_c}°C
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;