import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import CardWrapper from './CardWrapper';

const CardSkeleton = () => {
  const opacity = useRef(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          duration: 1300,
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          duration: 1300,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  }, []);

  const renderCardContent = () => {
    return (
      <Animated.View style={[styles.container, {opacity: opacity.current}]} />
    );
  };
  return <CardWrapper renderContent={renderCardContent} />;
};

export default CardSkeleton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginTop: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    border: 0.5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '100%',
    height: 150,
  },
});
