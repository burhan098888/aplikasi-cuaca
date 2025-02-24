import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "17cb84f384f7bf85ffead6bfc001cf95";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError("Gagal mengambil data cuaca. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-primary text-white p-4">
      <h1 className="mb-4 fw-bold text-center" style={{ fontSize: '3rem' }}>Aplikasi Cuaca</h1>
      <div className="bg-white p-5 rounded shadow-lg text-dark d-flex flex-column align-items-center justify-content-center"
        style={{ width: '100%', maxWidth: '1200px', minHeight: '500px' }}>
        <div className="w-100" style={{ maxWidth: '800px' }}>
          <input
            type="text"
            placeholder="Masukkan kota..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control mb-4 text-center"
            style={{ fontSize: '1.5rem', height: '60px' }}
          />
          <button
            onClick={fetchWeather}
            className="btn btn-primary w-100 mb-4"
            disabled={loading}
            style={{ fontSize: '1.5rem', height: '60px' }}
          >
            {loading ? "Mencari..." : "Cari Cuaca"}
          </button>
        </div>
        {error && <p className="text-danger text-center mt-2" style={{ fontSize: '1.5rem' }}>{error}</p>}
        {weather && (
          <div className="mt-4 p-4 bg-light shadow-sm rounded text-center w-100" style={{ maxWidth: '800px' }}>
            <h2 className="fw-semibold" style={{ fontSize: '2.5rem' }}>{weather.name}, {weather.sys.country}</h2>
            <p className="fs-1 fw-bold" style={{ fontSize: '4rem' }}>{weather.main.temp}°C</p>
            <p className="text-muted text-capitalize" style={{ fontSize: '2rem' }}>{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto d-block img-fluid"
              style={{ width: '150px', height: '150px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}