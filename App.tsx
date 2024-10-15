import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAllWeatherData } from './api/weatherApi';

const App = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllWeatherData();
      setWeatherData(data);
    };

    fetchData();
  }, []);

  return (
    
    <ScrollView style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Hava Durumu ☀️☁️🌧️</Text></View>
      {Object.entries(weatherData).map(([city, data]: [string, any]) => (
        
        <View key={city} style={styles.cityContainer}>
            
          <Text style={styles.cityName}>{city}</Text>
          <Text>Temperature: {data.main.temp}°C</Text>
          <Text>Weather: {data.weather[0].main}</Text>
          
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    
  },
  titleText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DA8359'
  },
  cityContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#96CEB4',
    borderRadius: 5,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;