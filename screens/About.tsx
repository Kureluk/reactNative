import React from 'react';
import { View, Image, FlatList, StyleSheet, Button } from 'react-native';
import Stars from '../images/stars.jpg';
import Img from '../images/2.jpg';
import Van from '../images/Vincent.jpg';
import { HomeScreenProps } from './types'

const paintings = [
  { id: '1', image: Stars }, 
  { id: '2', image: Img }, 
  { id: '3', image: Van }, 
  { id: '4', image: Stars }, 
];

const About = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={paintings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
      />
    <Button title="Назад" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: '1%',
    borderRadius: 10,
  },
});
