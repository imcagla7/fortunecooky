import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

interface FortuneCardProps {
  currentFortune: string;
  fortuneOpacity: Animated.Value;
  fortuneScale: Animated.Value;
  colors: {
    cardBg: string;
    fortuneText: string;
  };
}

const FortuneCard: React.FC<FortuneCardProps> = ({
  currentFortune,
  fortuneOpacity,
  fortuneScale,
  colors,
}) => {
  return (
    <Animated.View
      style={[
        styles.fortuneCardMinimal,
        {
          backgroundColor: colors.cardBg,
          opacity: fortuneOpacity,
          transform: [{scale: fortuneScale}],
        },
      ]}>
      <View style={styles.cardFrameMinimal}>
        <Text style={[styles.fortuneTextMinimal, {color: colors.fortuneText}]}>
          {currentFortune}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fortuneCardMinimal: {
    width: '60%',
    maxWidth: 200,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: -30,
  },
  cardFrameMinimal: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#8b4513',
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  fortuneTextMinimal: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Courier',
    marginBottom: 0,
  },
});

export default FortuneCard;
