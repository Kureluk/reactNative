import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { HomeScreenProps } from './types'
import { Image } from 'react-native';
import VanGoghImage from '../images/Vincent.jpg';

const Home = ({ navigation }: HomeScreenProps) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Вінсент ван Гог</Text>
        <Image source={VanGoghImage} style={styles.image} />
        <Text style={styles.description}>
          Вінсент ван Гог — відомий нідерландський художник, один із найвпливовіших представників постімпресіонізму.
        </Text>
        <Button title="Галерея" onPress={() => navigation.navigate('About')} />
      </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
  });