import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Modal,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from "react-native-edge-to-edge";

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [backPressCount, setBackPressCount] = useState(0);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);

  const RisaaCollections = [
    {
      id: 1,
      title: 'Siitolii',
      description: 'A collection of traditional Oromo folktales and stories.',
      image: require('../../assets/images/siitolii.jpg'),
      author: 'Kadiir Abdulaxif',
    },
    {
      id: 2,
      title: 'Dhaloota Sodaa Cabse',
      description: 'An in-depth look at the history and culture of the Oromo people.',
      image: require('../../assets/images/dhaloota.jpg'),
      author: 'Kadiir Abdulaxif',
    },
    {
      id: 3,
      title: 'Wayyoma',
      description: 'A linguistic guide and cultural exploration of the Oromo language.',
      image: require('../../assets/images/worroma.jpg'),
      author: 'Kadiir Abdulaxif',
    },
    {
      id: 4,
      title: 'Goonni Gosa Dhaala',
      description: 'The social, political, and cultural system of the Oromo people.',
      image: require('../../assets/images/goomi.jpg'),
      author: 'Asafa Jalata',
    },
  ];

  // Back press handler
  useEffect(() => {
    let backPressTimer;
    const onBackPress = () => {
      if (exitModalVisible) return true;
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('Double press to exit', ToastAndroid.SHORT);
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

  // Orientation lock
  useEffect(() => {
    const Orientation = require('react-native-orientation-locker').default;
    Orientation.lockToPortrait();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  // Interstitial Ads
  const adUnitId = 'ca-app-pub-7604915619325589/3947033537';
  const interstitial = useRef(
    InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    })
  );
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const openBookClickedRef = useRef(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.current.addAdEventListener(
      AdEventType.LOADED,
      () => setInterstitialLoaded(true)
    );
    const unsubscribeClosed = interstitial.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.current.load();
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

  const handleOpenBook = () => {
    openBookClickedRef.current = true;
    try {
      if (interstitialLoaded && interstitial.current) {
        interstitial.current.show();
      } else {
        navigation.navigate('Read');
        interstitial.current.load();
        openBookClickedRef.current = false;
      }
    } catch (error) {
      openBookClickedRef.current = false;
    }
  };

  // Render book card
  const renderCollectionItem = ({ item }) => (
    <View style={styles.collectionCard}>
      <Image source={item.image} style={styles.collectionImage} />
      <Text style={styles.collectionTitle}>{item.title}</Text>
      {/* <Text style={styles.collectionDescription}>{item.description}</Text> */}
      <Text style={styles.collectionAuthor}>By: {item.author}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={handleOpenBook}
      >
        <Text style={styles.readMoreButtonText}>📖 Read Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#512904ff', '#211c30ff', '#b5babeff']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SystemBars style="light" />
        <View style={styles.topShape} />
        <View style={styles.bottomShape} />

        <StatusBar
          translucent
          backgroundColor="transparent"
          hidden={isStatusBarHidden}
        />

        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.header}>
              <LottieView
                source={require('../../assets/animations/Book.json')}
                autoPlay
                loop
                style={styles.headerAnimation}
              />
              <Text style={styles.title}>📚 Risaa Book Store</Text>
            </View>

            {/* <Text style={[styles.title, { fontSize: 20, marginBottom: 10 }]}>
              Risaa Collections
            </Text> */}

            <FlatList
              data={RisaaCollections}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCollectionItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </View>
        </View>

        {/* Exit Modal */}
        <Modal
          visible={exitModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setExitModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>
                Are you sure you want to exit?
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => BackHandler.exitApp()}
                  style={styles.modalButtonPrimary}
                >
                  <Text style={styles.modalButtonTextPrimary}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setExitModalVisible(false)}
                  style={styles.modalButtonSecondary}
                >
                  <Text style={styles.modalButtonTextSecondary}>No</Text>
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
  collectionCard: {
    marginHorizontal: 5,
    backgroundColor: '#512904ff',
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  collectionImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'contain',
    backgroundColor: '#eef3f9',
  },
  collectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  collectionDescription: {
    fontSize: 12,
    color: '#aab6c5ff',
    marginBottom: 6,
    textAlign: 'center',
  },
  collectionAuthor: {
    fontSize: 11,
    color: '#bab0b0ff',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  readMoreButton: {
    backgroundColor: '#1a5f9c',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  readMoreButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  background: { flex: 1 },
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
  container: { flexGrow: 1, paddingBottom: 20 },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  headerAnimation: { width: 70, height: 70, marginBottom: 10 },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    minWidth: 260,
    alignItems: 'center',
  },
  modalText: { fontSize: 17, fontWeight: '700', marginBottom: 15 },
  modalActions: { flexDirection: 'row', marginTop: 10 },
  modalButtonPrimary: {
    backgroundColor: '#1a5f9c',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  modalButtonSecondary: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonTextPrimary: { color: '#fff', fontWeight: '600', fontSize: 15 },
  modalButtonTextSecondary: { color: '#333', fontWeight: '600', fontSize: 15 },
});
