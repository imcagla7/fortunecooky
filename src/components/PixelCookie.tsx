import React from 'react';
import {TouchableOpacity, View, Animated, StyleSheet} from 'react-native';

interface PixelCookieProps {
  _isPressed: boolean;
  isBroken: boolean;
  onPress: () => void;
  scale: Animated.Value;
  leftRotation: Animated.Value;
  rightRotation: Animated.Value;
}

const PixelCookie: React.FC<PixelCookieProps> = ({
  _isPressed,
  isBroken,
  onPress,
  scale,
  leftRotation,
  rightRotation,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[styles.cookieContainer, {transform: [{scale}]}]}>
        {!isBroken ? (
          // Whole Cookie
          <View style={styles.wholeCookie}>
            {/* Cookie Base */}
            <View style={styles.cookieBase}>
              {/* Cookie layers for pixel art effect */}
              <View style={[styles.cookieLayer, styles.layer1]} />
              <View style={[styles.cookieLayer, styles.layer2]} />
              <View style={[styles.cookieLayer, styles.layer3]} />
              <View style={[styles.cookieLayer, styles.layer4]} />
              <View style={[styles.cookieLayer, styles.layer5]} />

              {/* Cookie decorations */}
              <View style={styles.cookieSpots}>
                <View style={[styles.spot, styles.spot1]} />
                <View style={[styles.spot, styles.spot2]} />
                <View style={[styles.spot, styles.spot3]} />
              </View>
            </View>
          </View>
        ) : (
          // Broken Cookie Pieces
          <View style={styles.brokenCookie}>
            <Animated.View
              style={[
                styles.cookiePiece,
                styles.leftPiece,
                {
                  transform: [
                    {
                      rotate: leftRotation.interpolate({
                        inputRange: [-10, 0],
                        outputRange: ['-10deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}>
              <View style={styles.pieceLayer1} />
              <View style={styles.pieceLayer2} />
            </Animated.View>
            <Animated.View
              style={[
                styles.cookiePiece,
                styles.rightPiece,
                {
                  transform: [
                    {
                      rotate: rightRotation.interpolate({
                        inputRange: [0, 10],
                        outputRange: ['0deg', '10deg'],
                      }),
                    },
                  ],
                },
              ]}>
              <View style={styles.pieceLayer1} />
              <View style={styles.pieceLayer2} />
            </Animated.View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cookieContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wholeCookie: {
    position: 'relative',
  },
  cookieBase: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  cookieLayer: {
    position: 'absolute',
    backgroundColor: '#deb887',
  },
  layer1: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f5deb3',
  },
  layer2: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#deb887',
    top: 15,
    left: 15,
  },
  layer3: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#d2b48c',
    top: 30,
    left: 30,
  },
  layer4: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#cd853f',
    top: 45,
    left: 45,
  },
  layer5: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#deb887',
    top: 60,
    left: 60,
  },
  cookieSpots: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  spot: {
    position: 'absolute',
    backgroundColor: '#8b4513',
    borderRadius: 3,
  },
  spot1: {
    width: 8,
    height: 8,
    top: 60,
    left: 75,
  },
  spot2: {
    width: 6,
    height: 6,
    top: 100,
    left: 120,
  },
  spot3: {
    width: 7,
    height: 7,
    top: 85,
    left: 45,
  },
  brokenCookie: {
    flexDirection: 'row',
    width: 220,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cookiePiece: {
    width: 100,
    height: 160,
    position: 'relative',
  },
  leftPiece: {
    marginRight: 5,
  },
  rightPiece: {
    marginLeft: 5,
  },
  pieceLayer1: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    backgroundColor: '#deb887',
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
  },
  pieceLayer2: {
    position: 'absolute',
    width: '80%',
    height: '60%',
    backgroundColor: '#cd853f',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    top: '20%',
    left: '10%',
  },
});

export default PixelCookie;
