import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; 

const CardDeckAnimation = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const cards = [1, 2, 3, 4, 5]; 
  const currentCardIndex = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
        const direction = gesture.dx > 0 ? 1 : -1;
        Animated.timing(position, {
          toValue: { x: direction * SCREEN_WIDTH * 1.5, y: 0 },
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          position.setValue({ x: 0, y: 0 });
          currentCardIndex.current = (currentCardIndex.current + 1) % cards.length;
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
    ],
  };

  return (
    <View style={styles.container}>
      {cards.slice(currentCardIndex.current + 1).map((card, index) => (
        <View 
          key={`card-${card}`}
          style={[styles.card, styles.underCard, { zIndex: -index - 1 }]}
        />
      ))}
      
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, animatedStyle, { zIndex: 1 }]}
      >
        <View style={styles.cardContent} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    margin: 10,
  },
  underCard: {
    top: 10,
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
});

export default CardDeckAnimation;