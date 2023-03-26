import { useEffect, useState } from "react"
import TopButtons from "./components/TopButtons";
import Weather from "./components/Weather";
import { generarFecha } from "./helpers/fecha";

function App() {

  const api_key = '6ecec038734aa6df61b68a6df18f84e9';
  const base_url = 'https://api.openweathermap.org/data/2.5'

  const [weathers, setWeathers] = useState({});
  const [weather2, setWeather2] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [city, setCity] = useState({
    q: 'medellin'
  });

  useEffect(() => {

    const getLocation = async (infoType, searchParams) => {
      const url = new URL(base_url + '/' + infoType);
      url.search = new URLSearchParams({ ...searchParams, appid: api_key })
      const response = await fetch(url);
      const result = await response.json();
      setWeathers(result);
      setWeather2(result.weather)
    }
    getLocation('weather', {...city});
  }, [ciudad])

  const handleCity = () => {

    if(ciudad !== ''){
      setCity({q: ciudad})
    }

    setCiudad('');
  }

  const convertK = () => {
    const convertTemp = weathers?.main?.['temp'] - 273.15;

    return convertTemp;
  }

  const convertKAmbient = () => {
    const convertTemp = weathers?.main?.['feels_like'] - 273.15;

    return convertTemp;
  }

  return (
    <div className="mx-auto max-w-screen-xl mt-4 py-5 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 rounded-md overflow-hidden">
      <h1 className="text-center text-4xl font-bold mt-8 text-white">Weather App</h1>

      <div className="text-center mt-10 mb-6">
        <TopButtons />

        <div className="mb-4">
          <label className="block text-2xl mb-2 text-white font-bold" htmlFor="">City</label>
          <input className="py-2 px-8 rounded-md" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </div>

        <button className="bg-white hover:bg-slate-500 py-2 px-8 ml-2 rounded-md font-bold mb-6" onClick={handleCity}>Search</button>

        <p className="text-white font-bold text-2xl mb-4">{generarFecha()}</p>

        <div>
        <img className="mx-auto mb-2" src={'../public/clima-urbano.gif'} alt="" />
        </div>
        

        <h2 className="text-white font-bold text-3xl">{weathers.name}, {weathers?.sys?.country}</h2>
        <Weather />
        <div className='flex justify-around items-center'>
          <img className='w-24' src="https://assets.zabbix.com/img/brands/openweather.jpg" alt="" />
          <p className='text-2xl text-white'>{convertK().toFixed(2)}°C</p>
        </div>
      </div>

      {/* <img className="w-10" src={'../public/temperature-high-solid.svg'} alt="" /> */}

      <div className="text-center text-white flex justify-between px-4">
        <p className="text-2xl font-bold mb-2">Ciudad: <br /> <span className="font-normal text-md">{weathers.name}</span></p>
        <p className="text-2xl font-bold mb-2">Nubes: <br /> <span className="font-normal text-md">{weather2[0]?.['description']}</span></p>
        <p className="text-2xl font-bold mb-2">Humedad: <br /> <span className="font-normal text-md">{weathers?.main?.humidity}</span></p>
        <p className="text-2xl font-bold mb-2">Temperatura: <br /> <span className="font-normal text-md">{convertK().toFixed(2)}°C</span></p>
        <p className="text-2xl font-bold mb-2">Temperatura Ambiente: <br /> <span className="font-normal text-md">{convertKAmbient().toFixed(2)}°C</span></p>
      </div>
    </div>
  )
}

export default App
