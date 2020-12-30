import React, { Componenet, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

import WorldStatistics from './components/WorldStatistics';
import CountryList from './components/CountryList';
import CountryStats from './components/CountryStats';
import FavouriteList from './components/FavouriteList.js';


function CountryStatistics() {
  return (
    <Stack.Navigator
      initialRouteName = "List of Countries"
      screenOptions={{
      headerShown: true}}
    >
        <Stack.Screen 
          name="List of Countries"
          component={CountryList}
        />
        <Stack.Screen
          name="Country Statistics"
          component={CountryStats}
          screenOptions={() => ({
            headerShown: true,
          })}
        />
    </Stack.Navigator>
  );
}


function Favourite({navigation}) {
  return (
    <Stack.Navigator 
      initialRouteName="Favourite List of Countries"
      screenOptions={{
        headerShown: true}}
    >
      <Stack.Screen name="Favourite List of Countries" component={FavouriteList} />
      <Stack.Screen name="Country Statistics" component={CountryStats} />
    </Stack.Navigator>
    
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator 
      screenOptions={({navigation}) => ({
        headerShown: true,
        headerLeft: () => (
          <View style={{ paddingLeft: 10 }}>
            <FontAwesome
              style={{paddingLeft: 5}}
              name="bars" 
              size={25}
              color="black"
              onPress={() =>
                navigation.openDrawer()
              }
            >
            </FontAwesome>
            
          </View>
        )
      })}
    >
      <Drawer.Screen name="World Statistics" component={WorldStatistics} />
      <Drawer.Screen name="Country Statistics" component={CountryStatistics} />
      <Drawer.Screen name="Favourite Countries" component={Favourite} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    margin: '10px'

  },
});