import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TodoList from "./components/TodoList";

export default function App() {


  return (
    <View style={styles.container}>
      <TodoList/>
    </View>
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
