import React, { Componenet, useState, useEffect } from 'react';
import { ActivityIndicator, Button, View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import axios from "axios";


export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [dataSourceWorld, setDataSourceWorld] = useState([]);
  const [dataSourceCovid, setDataSourceCovid] = useState([]);

  useEffect(() => {
    getTotalWorldData();
    getTotalCovidData();
  }, []);

  const getTotalWorldData = () => {
    axios.request({
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/worldpopulation',
      headers: {
        'x-rapidapi-key': '6773c6211amshfe2d6c2dce22c23p1545b0jsn96b14152b76b',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    })
      .then(function (response) {
        setLoading(false)
        setDataSourceWorld(response.data.body)
    }).catch(function (error) {
        console.error(error);
    });
  }


  const getTotalCovidData = () => {
    axios.request({
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      headers: {
        'x-rapidapi-key': '6773c6211amshfe2d6c2dce22c23p1545b0jsn96b14152b76b',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
    })
      .then(function (response) {
        setLoading(false)
        setDataSourceCovid(response.data)
        console.log(dataSourceWorld.world_population)
    }).catch(function (error) {
        console.error(error);
    });
  };


  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ padding: 30}}>
      <Text style={[styles.mapText1]}>World Population: {dataSourceWorld.world_population}</Text>
      {dataSourceCovid.map((item) => (
        <View>
          <Text style={styles.mapText1}>Confirmed Cases: {item.confirmed} </Text>
          <Text style={styles.mapText2}>Confirmed Percentage: {((item.confirmed)/dataSourceWorld.world_population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Recovered Cases: {item.recovered} </Text>
          <Text style={styles.mapText2}>Recovered Percentage: {((item.recovered)/dataSourceWorld.world_population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Crtitical Cases: {item.critical} </Text>
          <Text style={styles.mapText2}>Critical Percentage: {((item.critical)/dataSourceWorld.world_population * 100).toFixed(3)}% </Text>
          <Text style={styles.mapText1}>Deaths: {item.deaths} </Text>
          <Text style={styles.mapText2}>Deaths Percentage: {((item.deaths)/dataSourceWorld.world_population * 100).toFixed(2)}% </Text>
          <Text style={styles.mapText1}>Last Updated: {item.lastUpdate.split('T')[0]} </Text>
        </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({

  mapText1: {
    marginTop: 10,
    marginBottom: 1,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 18
  },
  mapText2: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 400,
    fontSize: 18
  },
});   