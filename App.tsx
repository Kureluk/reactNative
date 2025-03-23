import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Test from "./components/Test";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <View style={styles.container}>
      {quizStarted ? (
        <Test onQuizEnd={() => setQuizStarted(false)} />
      ) : (
        <>
          <Text style={styles.title}>Тест на темперамент</Text>
          <Button title="Старт" onPress={() => setQuizStarted(true)} />
        </>
      )}
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
