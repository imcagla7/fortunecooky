/**
 * Fortune Cookie React Native App
 * A simple app that displays random fortunes when you tap the cookie
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';

import {PixelCookie, FortuneCard, RefreshButton} from './src/components';
import aiFortuneService from './src/services/aiService';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentFortune, setCurrentFortune] = useState('');
  const [showFortune, setShowFortune] = useState(false);
  const [isCookieBroken, setIsCookieBroken] = useState(false);
  const [isLoadingFortune, setIsLoadingFortune] = useState(false);
  const [fortuneError, setFortuneError] = useState<string | null>(null);

  const cookieScale = useRef(new Animated.Value(1)).current;
  const fortuneOpacity = useRef(new Animated.Value(0)).current;
  const fortuneScale = useRef(new Animated.Value(0.5)).current;
  const leftPieceRotation = useRef(new Animated.Value(0)).current;
  const rightPieceRotation = useRef(new Animated.Value(0)).current;

  const getAIFortune = async () => {
    setIsLoadingFortune(true);
    setFortuneError(null);

    try {
      // You can configure the AI service here
      const result = await aiFortuneService.getFortune({
        preferredProvider: 'gemini',
      });

      if (result.success && result.fortune) {
        setCurrentFortune(result.fortune);
        setShowFortune(true);
        setIsLoadingFortune(false);

        // Start fortune display animation
        Animated.parallel([
          Animated.timing(fortuneOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.spring(fortuneScale, {
            toValue: 1,
            tension: 40,
            friction: 6,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        throw new Error(result.error || 'Failed to get fortune');
      }
    } catch (error: any) {
      setIsLoadingFortune(false);
      setFortuneError(error.message);
      // Fallback to a default message
      setCurrentFortune('Teknik bir sorun oluştu. Lütfen tekrar deneyin.');
      setShowFortune(true);

      Animated.parallel([
        Animated.timing(fortuneOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(fortuneScale, {
          toValue: 1,
          tension: 40,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleCookiePress = () => {
    if (showFortune || isLoadingFortune) {
      return; // Prevent multiple clicks
    }

    // Break cookie animation
    Animated.sequence([
      Animated.timing(cookieScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cookieScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsCookieBroken(true);

      // Start rotation animation for broken pieces
      Animated.parallel([
        Animated.timing(leftPieceRotation, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rightPieceRotation, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      // Get AI fortune after a short delay
      setTimeout(() => {
        getAIFortune();
      }, 500);
    });
  };

  const handleRefresh = () => {
    setShowFortune(false);
    setIsCookieBroken(false);
    setCurrentFortune('');
    setIsLoadingFortune(false);
    setFortuneError(null);

    // Reset animations
    fortuneOpacity.setValue(0);
    fortuneScale.setValue(0.5);
    cookieScale.setValue(1);
    leftPieceRotation.setValue(0);
    rightPieceRotation.setValue(0);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#2a2d47' : '#fff5f8', // Soft bunny background
  };

  const colors = {
    primary: isDarkMode ? '#ffb3d1' : '#ff69b4', // Bunny pink
    secondary: isDarkMode ? '#3d4263' : '#fff8f0', // Soft cream
    accent: '#ff6b6b',
    cookieBase: '#deb887',
    cookieDark: '#cd853f',
    cookieLight: '#f5deb3',
    text: isDarkMode ? '#ffb3d1' : '#8b4513', // Bunny pink for text
    fortuneText: isDarkMode ? '#ffffff' : '#3d2914',
    cardBg: isDarkMode ? '#ffffff' : '#ffffff',
    cardShadow: isDarkMode ? '#000000' : '#8b4513',
    loading: isDarkMode ? '#ffb3d1' : '#ff69b4', // Bunny pink
    bunnyAccent: '#ffc0cb', // Light pink
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* Refresh Button */}
      <RefreshButton onPress={handleRefresh} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollView, backgroundStyle]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.primary}]}>
            Fortune Cooky 🍪
          </Text>
          <Text style={[styles.subtitle, {color: colors.text}]}>
            Bir mesajın var!
          </Text>
        </View>

        {/* Fortune Cookie */}
        <View style={styles.mainContainer}>
          {!isCookieBroken ? (
            <>
              <PixelCookie
                _isPressed={false}
                isBroken={isCookieBroken}
                onPress={handleCookiePress}
                scale={cookieScale}
                leftRotation={leftPieceRotation}
                rightRotation={rightPieceRotation}
              />

              <Text style={[styles.tapHint, {color: colors.text}]}>
                🐰 Kurabiyeye dokunun!
              </Text>
            </>
          ) : (
            <View style={styles.brokenCookieContainer}>
              {/* Broken Cookie Pieces - Background */}
              <View style={styles.brokenCookieBackground}>
                <PixelCookie
                  _isPressed={false}
                  isBroken={true}
                  onPress={() => {}}
                  scale={cookieScale}
                  leftRotation={leftPieceRotation}
                  rightRotation={rightPieceRotation}
                />
              </View>

              {/* Loading Indicator */}
              {isLoadingFortune && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.loading} />
                </View>
              )}

              {/* Fortune Card - Foreground */}
              {showFortune && !isLoadingFortune && (
                <FortuneCard
                  currentFortune={currentFortune}
                  fortuneOpacity={fortuneOpacity}
                  fortuneScale={fortuneScale}
                  colors={{
                    cardBg: colors.cardBg,
                    fortuneText: colors.fortuneText,
                  }}
                />
              )}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: colors.text}]}>
            Fortune Cooky by imcagla7 ✨
          </Text>
          {fortuneError && (
            <Text style={[styles.errorText, {color: colors.accent}]}>
              Debug: {fortuneError}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    fontStyle: 'italic',
    fontFamily: 'Courier',
  },
  mainContainer: {
    alignItems: 'center',
    marginVertical: 40,
    minHeight: 300,
    justifyContent: 'center',
  },
  tapHint: {
    marginTop: 20,
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  brokenCookieContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  brokenCookieBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
    marginTop: 40,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    fontFamily: 'Courier',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: 'Courier',
  },
});

export default App;
