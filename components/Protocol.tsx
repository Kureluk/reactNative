import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import SketchCanvas from '@terrylinla/react-native-sketch-canvas';

type RootStackParamList = {
  Home: undefined;
  ParticipantA: { participant: string };
  ParticipantB: { participant: string };
  DamageReport: undefined;
};

type ParticipantScreenRouteProp = RouteProp<RootStackParamList, 'ParticipantA' | 'ParticipantB'>;

type ParticipantScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParticipantA' | 'ParticipantB'>;

type ParticipantScreenProps = {
  route: ParticipantScreenRouteProp;
  navigation: ParticipantScreenNavigationProp;
};

type DamageReportScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DamageReport'>;
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen = ({ navigation }: HomeScreenProps) => (
  <View>
    <Text>Головний екран</Text>
    <Button title="Оформити протокол" onPress={() => navigation.navigate('ParticipantA', { participant: 'A' })} />
  </View>
);

const ParticipantScreen = ({ navigation, route }: ParticipantScreenProps) => (
    <View>
      <Text>Дані про учасника {route.params.participant}</Text>
      <TextInput placeholder="Ім'я" />
      <TextInput placeholder="Прізвище" />
      <TextInput placeholder="Дата народження" />
      <TextInput placeholder="Телефон" keyboardType="phone-pad" />
      <TextInput placeholder="Модель авто" />
      <TextInput placeholder="Номер авто" />
      <Button 
        title="Далі" 
        onPress={() => {
          if (route.params.participant === 'A') {
            navigation.navigate('ParticipantB', { participant: 'B' });
          } else {
            navigation.navigate('DamageReport');
          }
        }} 
      />
    </View>
  );

const DamageReportScreen = ({ navigation }: DamageReportScreenProps) => (
  <View style={{ flex: 1 }}>
    <Text>Вид пошкодження</Text>
    <TextInput placeholder="Сторона пошкодження" />
    <TextInput placeholder="Короткий опис" multiline />
    <SketchCanvas
        style={{ flex: 1, height: 300 }}
        strokeColors={[{ color: '#000000' }]}
        minStrokeWidth={3}  
        />
    <Button title="Завершити" onPress={() => navigation.navigate('Home')} />
  </View>
);

export default function Protocol() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ParticipantA" component={ParticipantScreen} initialParams={{ participant: 'A' }} />
        <Stack.Screen name="ParticipantB" component={ParticipantScreen} initialParams={{ participant: 'B' }} />
        <Stack.Screen name="DamageReport" component={DamageReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}