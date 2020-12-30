import React, { Componenet, useState, useEffect } from 'react';
import { ActivityIndicator, Button, View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import axios from "axios";
import { ListItem } from 'react-native-elements';


export default function App({navigation, route}) {
  const [isLoading, setLoading] = React.useState(true);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getCountryListData();
  }, []);

  const getCountryListData = () => {
    axios.request({
      method: 'GET',
      url: 'https://world-population.p.rapidapi.com/allcountriesname',
      headers: {
        'x-rapidapi-key': '6773c6211amshfe2d6c2dce22c23p1545b0jsn96b14152b76b',
        'x-rapidapi-host': 'world-population.p.rapidapi.com'
      }
    })
      .then(function (response) {
        setLoading(false)
        setDataSource(response.data.body.countries)
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
    <View>
      {dataSource.map((item,i) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Country Statistics', { countryNameFromList: (item) })}
        >
          <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content> 
          </ListItem>
        </TouchableOpacity>
      ))
      }
    </View>
  );
}     