import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Provider } from 'react-redux';
import TabNavigator from './components/TabNavigator';
import { store } from './store';



export default function App() {


  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>

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
