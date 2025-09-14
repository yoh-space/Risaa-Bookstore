import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Modal,
  StatusBar
} from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from "react-native-edge-to-edge";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [backPressCount, setBackPressCount] = useState(0);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [ isStatusBarHidden, setIsStatusBarHidden ] = useState(false);

  useEffect(() => {
    let backPressTimer;
    const onBackPress = () => {
      if (exitModalVisible) return true;
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('please double click to exit the app', ToastAndroid.SHORT);
        backPressTimer = setTimeout(() => setBackPressCount(0), 2000);
        return true;
      } else {
        setExitModalVisible(true);
        return true;
      }
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      subscription.remove();
      clearTimeout(backPressTimer);
    };
  }, [backPressCount, exitModalVisible]);
  // Lock orientation to portrait for Home screen
  useEffect(() => {
    const Orientation = require('react-native-orientation-locker').default;
    Orientation.lockToPortrait();
    return () => {
      Orientation.lockToPortrait();
    };
  });
  const [expanded, setExpanded] = React.useState(false);

  const adUnitId = 'ca-app-pub-7604915619325589/3947033537';
  const interstitial = useRef(
    InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    })
  );
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.current.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
        // console.log('Interstitial ad loaded:', true);
      }
    );
    const unsubscribeClosed = interstitial.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.current.load();
        // Only navigate to Read if user clicked Open Book
        if (openBookClickedRef.current) {
          navigation.navigate('Read');
          openBookClickedRef.current = false;
        }
      }
    );
    interstitial.current.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);
  
  // Track if user clicked Open Book
  const openBookClickedRef = useRef(false);
  const handleOpenBook = () => {
    openBookClickedRef.current = true;
    try {
      // console.log('Interstitial ad loaded state:', interstitialLoaded);
      if (interstitialLoaded && interstitial.current) {
        interstitial.current.show();
      } else {
        navigation.navigate('Read');
        interstitial.current.load();
        openBookClickedRef.current = false;
      }
    } catch (error) {
      // console.log('Error in handleOpenBook:', error);
      openBookClickedRef.current = false;
    }
  };

  const shortDescription = (
    <Text style={styles.description}>
      Handhuuraa Oromoo Arsii is a unique and comprehensive resource in Afan Oromo that delves into the rich cultural heritage, values, and traditions of the Arsi Oromo people.
    </Text>
  );
  
  const fullDescription = (
    <>
      <Text style={styles.description}>
        Welcome to <Text style={styles.bold}>Handhuurraa Oromo Arsi</Text> a unique and comprehensive resource in Afan Oromo that delves into the rich cultural heritage, values, and traditions of the Arsi Oromo people.
        {"\n\n"}This book brings together essential topics such as:
      </Text>
      <View style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <Icon name="history" size={18} color="#4a6fa5" style={styles.bulletIcon} />
          <Text style={styles.bullet}>History & Indigenous Knowledge</Text>
        </View>
        <View style={styles.bulletItem}>
          <Icon name="people" size={18} color="#4a6fa5" style={styles.bulletIcon} />
          <Text style={styles.bullet}>Folklore & Cultural Practices</Text>
        </View>
        <View style={styles.bulletItem}>
          <Icon name="public" size={18} color="#4a6fa5" style={styles.bulletIcon} />
          <Text style={styles.bullet}>Religious Beliefs & Gadaa System</Text>
        </View>
        <View style={styles.bulletItem}>
          <Icon name="shield" size={18} color="#4a6fa5" style={styles.bulletIcon} />
          <Text style={styles.bullet}>Resistance, Resilience & Identity</Text>
        </View>
      </View>
      <Text style={styles.description}>
        Whether you're here to explore the treasures of Oromo wisdom or understand how heritage shapes identity, this book is your guide to celebrating the vibrant Arsi Oromo legacy.{"\n\n"}Enjoy Your Reading! 🌱
      </Text>
    </>
  );
  // Remove auto-show on every render

  return (
    <View style={{ flex: 1}}>
    <LinearGradient
      colors={['#1a5f9c', '#2284c9', '#2aa8f5']}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SystemBars style="light" />    
      {/* Background shapes */}
      <View style={styles.topShape} />
      <View style={styles.bottomShape} />
      <StatusBar 
          translucent 
                backgroundColor="#1a5f9c" 
                barStyle="light-content" 
                hidden={isStatusBarHidden} 
              />  
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <LottieView
              source={require('../../assets/animations/Book.json')}
              autoPlay
              loop
              style={styles.headerAnimation}
            />
            <Text style={styles.title}>Handhuuraa Oromoo Arsii</Text>
            <Text style={styles.subtitle}>Discover the Cultural Heritage</Text>
          </View>

          <View style={styles.card}>
            {expanded ? fullDescription : shortDescription}
            <TouchableOpacity 
              onPress={() => setExpanded(!expanded)} 
              style={styles.seeMoreButton}
            >
              <Text style={styles.seeMoreText}>
                {expanded ? 'Show Less' : 'Read More'} 
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../assets/animations/Readingbook.json')}
              autoPlay
              loop
              style={styles.mainAnimation}
            />
          </View>

          <Pressable
            onPress={handleOpenBook}
            android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
            style={({ pressed }) => [
              styles.openBookButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={['#ffffff', '#e6f2ff']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="menu-book" size={24} color="#1a5f9c" style={styles.buttonIcon} />
              <Text style={styles.openBookText}>Open The Book</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    {/* Exit Confirmation Modal */}
    <Modal
      visible={exitModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setExitModalVisible(false)}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 30, minWidth: 260, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 15 }}>Are you sure to exit the app?</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => BackHandler.exitApp()}
              style={{ backgroundColor: '#1a5f9c', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8, marginRight: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setExitModalVisible(false)}
              style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 }}
            >
              <Text style={{ color: '#333', fontWeight: '600', fontSize: 16 }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </LinearGradient>      
    </View>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topShape: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomShape: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerAnimation: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 22,
    borderRadius: 18,
    marginBottom: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  bulletList: {
    marginBottom: 15,
    marginLeft: 5,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bulletIcon: {
    marginRight: 10,
  },
  bullet: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 22,
  },
  seeMoreButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  seeMoreText: {
    color: '#1a5f9c',
    fontWeight: '600',
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  animationContainer: {
    width: width * 0.55,
    height: width * 0.55,
    alignSelf: 'center',
  },
  mainAnimation: {
    width: '100%',
    height: '100%',
  },
  openBookButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 10,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonIcon: {
    marginRight: 12,
  },
  openBookText: {
    color: '#1a5f9c',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  adContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
  },
});