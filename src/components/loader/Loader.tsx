import React, {useEffect, useRef} from 'react';
import {
  Animated,
  // Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loader: React.FC = ({
  size = 'large',
  color = '#ffffff',
}: {
  size?: 'small' | 'large';
  color?: string;
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Rotation animation
  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    );
    spin.start();

    return () => spin.stop();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#50E3C2']}
        style={styles.backgroundGradient}
      />
      <Animated.View
        style={[
          styles.loaderWrapper,
          {transform: [{rotate: spin}]},
        ]}
      >
        <ActivityIndicator size={size} color={color} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  loaderWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Loader;
