import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface ProgressBarTheme {
  backgroundColor: string;
  textColor: string;
  inputBackgroundColor: string;
  accentColor: string;
}

interface ProgressBarProps {
  progress: number;
  duration?: number;
  theme: ProgressBarTheme;
  minDuration?: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  duration = 1000, 
  theme,
  minDuration = 4000 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayProgress, setDisplayProgress] = useState(0);
  const startTime = useRef(Date.now()).current;

  useEffect(() => {
    const actualDuration = Math.max(
      duration, 
      minDuration * (progress / 100)
    );

    Animated.timing(animatedValue, {
      toValue: progress,
      duration: actualDuration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    const listener = animatedValue.addListener(({ value }) => {
      setDisplayProgress(Math.floor(value));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [progress, duration, minDuration]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarBackground, { backgroundColor: theme.inputBackgroundColor }]}>
        <Animated.View 
          style={[
            styles.progressBarFill,
            { 
              width: widthInterpolated,
              backgroundColor: theme.accentColor 
            }
          ]}
        />
      </View>
      <Text style={[styles.progressText, { color: theme.textColor }]}>
        {displayProgress}% {displayProgress < 100 ? 'Loading...' : 'Done!'}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  progressBarBackground: {
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProgressBar;