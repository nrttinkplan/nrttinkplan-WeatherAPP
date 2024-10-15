import axios from "axios";

const API_KEY = "b280ebf7e7a683eceb3de1c8c596a112";
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


const CITIES = [
    'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Trabzon', 'Diyarbakir'
];

export const getWeatherData = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.log('Hava durumu verisi hatası ${city}:', error);
        return null;
    }
};

export const getAllWeatherData = async () => {
    try {
      const weatherPromises = CITIES.map(city => getWeatherData(city));
      const weatherData = await Promise.all(weatherPromises);
      return weatherData.reduce((acc, data, index) => {
        if (data) {
          acc[CITIES[index]] = data;
        }
        return acc;
      }, {});
    } catch (error) {
      console.error('Hava Durumu verisi alınırken hata oluştu:', error);
      return {};
    }
  };