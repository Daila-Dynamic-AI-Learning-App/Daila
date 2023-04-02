import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

function LoadScreen() {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef(null);
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect (() => {
    if (isFocused){
      setMounted(true);
    }

    return () => {
      setMounted(false);
      clearTimeout(timerRef.current);
    };
  },[isFocused]);

  useEffect (() => {

    if (mounted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            opacityValue,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            opacityValue,
            {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
            }
          )
        ])
      ).start();

      timerRef.current = setTimeout(() => {
        navigation.navigate('Home');
      }, 5000);
    }

    return () => {
      clearTimeout(timerRef.current);
      opacityValue.stopAnimation();
    };
  }, [mounted, navigation, opacityValue]);

  const opacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1]
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/daila-1.png')}
        style={[styles.logo, {opacity: opacity}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b7b7b'
  },

  logo: {
    width: '100%',
    height: '50%',
    marginBottom: 0,
  },
})

export default LoadScreen;
