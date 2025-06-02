import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

interface RefreshButtonProps {
  onPress: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({onPress}) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onPress} style={styles.refreshButton}>
        <View style={styles.refreshIconContainer}>
          <View style={[styles.refreshPixel, styles.pixel1]} />
          <View style={[styles.refreshPixel, styles.pixel2]} />
          <View style={[styles.refreshPixel, styles.pixel3]} />
          <View style={[styles.refreshPixel, styles.pixel4]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#deb887',
    borderWidth: 2,
    borderColor: '#8b4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshPixel: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#8b4513',
    borderRadius: 1,
  },
  pixel1: {
    top: 4,
    left: 4,
  },
  pixel2: {
    top: 4,
    right: 4,
  },
  pixel3: {
    bottom: 4,
    left: 4,
  },
  pixel4: {
    bottom: 4,
    right: 4,
  },
});

export default RefreshButton;
