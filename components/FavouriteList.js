import React, { Componenet, useState, useEffect } from 'react';
import { ActivityIndicator, Button, View, Text, ScrollView, Image, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import axios from "axios";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App({navigation, route}) {
  const [getStar, setStar] = useState("grey");
  const [getList,setList] = useState([ 'Pakistan']);

  useEffect(() => {
    getDataFromStorage();
  }, [])

  const getDataFromStorage = async () => {
    try {
      var fav = await AsyncStorage.getItem('@favouriteCountriesList');
      if (fav !== null || fav !== undefined) {
        setList(getList.concat(JSON.parse(fav)[0].country_name))
      }
    } catch (error) {
      console.error(error);
    }

  };

  const removeItem =(item)=> {
    if (getStar == 'grey'){
      setStar("blue")
    }
    else{
      setStar("grey")
    }
  };
  return (
    <View>
      {getList.map((item,i) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Country Statistics', { countryNameFromList: (item) })}
        >
          <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content>
              <FontAwesome name="star" size={24} color={getStar} onPress={() => removeItem(item)} />          </ListItem>
        </TouchableOpacity>
      ))
      }
    </View>
  );
}

const styles = StyleSheet.create({

});      