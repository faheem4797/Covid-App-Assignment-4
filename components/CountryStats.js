import React, { Componenet, useState, useEffect } from 'react';
import { ActivityIndicator, Button, View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [dataSourceCountry, setDataSourceCountry] = useState([]);
  const [dataSourceCovidCountry, setDataSourceCovidCountry] = useState([]);
  const [getCountryName, setCountryName] = useState(route.params.countryNameFromList)
  
  useEffect(() => {
    getCountryData();
    getCountryCovidData();
  }, []);

  const getCountryCovidData = () => {
    axios.request({
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country',
      params: {name: getCountryName},
      headers: {
        'x-rapidapi-key': '6773c6211amshfe2d6c2dce22c23p1545b0jsn96b14152b76b',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }}
      )
      .then(function (response) {
        setLoading(false)
        setDataSourceCovidCountry(response.data)
    }).catch(function (error) {
        console.error(error);
    });
  };


  const getCountryData = () => {
    axios.request({
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/population',
      params: {country_name: getCountryName},
      headers: {
        'x-rapidapi-key': '6773c6211amshfe2d6c2dce22c23p1545b0jsn96b14152b76b',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    })
      .then(function (response) {
        setLoading(false)
        setDataSourceCountry(response.data.body)
    }).catch(function (error) {
        console.error(error);
    });
  }
  
  const savePersistent = async () => {
    try {
    await AsyncStorage.setItem('@favouriteCountriesList', JSON.stringify([dataSourceCountry]))
    console.log(await AsyncStorage.getItem('@favouriteCountriesList'))
    } catch (error) {
      console.log(error);
    }
  }

  navigation.setOptions({
    headerRight: () => (
      <View style={{ paddingRight: 10 }}>
        <FontAwesome
          name="star"
          size={24}
          color="grey"
          onPress = {savePersistent}
        />
      </View>
    ),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
      <Text style={styles.mapText1}>Country Name: {dataSourceCountry.country_name}</Text>
      <Text style={styles.mapText2}>Country Population: {dataSourceCountry.population}</Text>
      {dataSourceCovidCountry.map((item) => (
        <View>
          <Text style={styles.mapText1}>Confirmed Cases: {item.confirmed} </Text>
          <Text style={styles.mapText2}>Confirmed Percentage: {((item.confirmed)/dataSourceCountry.population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Recovered Cases: {item.recovered} </Text>
          <Text style={styles.mapText2}>Recovered Percentage: {((item.recovered)/dataSourceCountry.population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Crtitical Cases: {item.critical} </Text>
          <Text style={styles.mapText2}>Critical Percentage: {((item.critical)/dataSourceCountry.population * 100).toFixed(3)}% </Text>
          <Text style={styles.mapText1}>Deaths: {item.deaths} </Text>
          <Text style={styles.mapText2}>Deaths Percentage: {((item.deaths)/dataSourceCountry.population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Last Updated: {item.lastUpdate.split('T')[0]} </Text>
        </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({

  mapText1: {
    marginTop: 8,
    marginBottom: 1,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 18
  },
  mapText2: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 400,
    fontSize: 16
  },
});      