import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';


export default function App() {


  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
