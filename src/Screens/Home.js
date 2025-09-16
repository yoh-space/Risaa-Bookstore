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
  Animated,
  Easing,
} from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from "react-native-edge-to-edge";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [backPressCount, setBackPressCount] = useState(0);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [unlockedBooks, setUnlockedBooks] = useState([1]); // Example: Book with id 1 is unlocked

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const RisaaCollections = [
    {
      id: 1,
      title: 'Siitolii',
      description: 'A collection of traditional Oromo folktales and stories.',
      image: require('../../assets/images/siitolii.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 4.99,
      rating: 4.8,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        {
          title: 'BOQONNAA 1:HAACAALUUHUNDEESSAA',
          startPage: 13,
      },
        {
          title: ' BOQONNAA 2:HAACAAALUUFIAARTII',
          startPage: 42,
        },
        {
          title: ' BOQONNAA 3:SIRBOOTAHAACAAALUU',
          startPage: 47,
        },
        {
          title: ' BOQONNAA 4:DHALOOTASODAACABSE',
          startPage: 80,
        },
        {
          title: ' BOQONNAA 5:SEENDUUBEESIRBAHAACAAALUU',
          startPage: 96,
        },
        {
          title: 'BOQONNAA 6:ABJUUKARAATTIHAFE',
          startPage: 129,
        },
        {
          title: '',
          startPage: 0,
        }  
    ]
    },
    {
      id: 2,
      title: 'Dhaloota Sodaa Cabse',
      description: 'An in-depth look at the history and culture of the Oromo people.',
      image: require('../../assets/images/dhaloota.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 5.99,
      rating: 4.5,
      pdfPath: {uri: 'bundle-assets://Hidhaa.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: The Origins of the Oromo', startPage: 15 },
        { title: 'Chapter 2: The Gadaa System', startPage: 45 },
        { title: 'Chapter 3: Oromo Traditions and Customs', startPage: 78 },
        { title: 'Chapter 4: The Oromo Language', startPage: 102 },
      ],
    },
    {
      id: 3,
      title: 'Wayyoma',
      description: 'A linguistic guide and cultural exploration of the Oromo language.',
      image: require('../../assets/images/worroma.jpg'),
      author: 'Kadiir Abdulaxif',
      price: 3.99,
      rating: 4.2,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Oromo Alphabet and Pronunciation', startPage: 12 },
        { title: 'Chapter 2: Basic Grammar and Sentence Structure', startPage: 36 },
        { title: 'Chapter 3: Common Phrases and Expressions', startPage: 58 }, 
      ] 
    },
    {
      id: 4,
      title: 'Goonni Gosa Dhaala',
      description: 'The social, political, and cultural system of the Oromo people.',
      image: require('../../assets/images/goomi.jpg'),
      author: 'Asafa Jalata',
      price: 6.99,
      rating: 4.7,
      pdfPath: {uri: 'bundle-assets://Dhaloota.pdf'},
      chapterTitle: [
        { title: 'Chapter 1: Introduction to the Gadaa System', startPage: 10 },
        { title: 'Chapter 2: Gadaa Leadership and Governance', startPage: 35 },
        { title: 'Chapter 3: Gadaa Rituals and Ceremonies', startPage: 60 },
        { title: 'Chapter 4: The Role of Age Sets in Oromo Society', startPage: 85 },
        { title: 'Chapter 5: Contemporary Challenges and the Future of Gadaa', startPage: 110 },
      ]
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
  const pendingBookParamsRef = useRef(null);

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
        if (openBookClickedRef.current && pendingBookParamsRef.current) {
          navigation.navigate('Read', pendingBookParamsRef.current);
          openBookClickedRef.current = false;
          pendingBookParamsRef.current = null;
        }
      }
    );
    interstitial.current.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const handleOpenBook = ({pdfPath, title, chapterPage, chapterTitle}) => {
    openBookClickedRef.current = true;
    pendingBookParamsRef.current = { pdfPath, title, chapterPage, chapterTitle };
    try {
      if (interstitialLoaded && interstitial.current) {
        interstitial.current.show();
      } else {
        navigation.navigate('Read', { pdfPath, title, chapterPage, chapterTitle });
        interstitial.current.load();
        openBookClickedRef.current = false;
        pendingBookParamsRef.current = null;
      }
    } catch (error) {
      openBookClickedRef.current = false;
      pendingBookParamsRef.current = null;
    }
  };

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
    ToastAndroid.show(`${book.title} added to cart`, ToastAndroid.SHORT);
  };

  const isBookUnlocked = (bookId) => {
    return unlockedBooks.includes(bookId);
  };

  // Render book card
  const renderCollectionItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.collectionCard,
        {
          opacity: fadeAnim,
          transform: [
            { 
              translateY: slideAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 20 - (index * 5)],
                extrapolate: 'clamp'
              })
            }
          ]
        }
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.collectionImage} />
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        {!isBookUnlocked(item.id) && (
          <View style={styles.lockedOverlay}>
            <Ionicons name="lock-closed" size={24} color="#FFF" />
            <Text style={styles.lockedText}>Purchase to unlock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.collectionTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.collectionAuthor}>By {item.author}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          {isBookUnlocked(item.id) ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.readButton]}
              onPress={() => handleOpenBook({
                pdfPath: item.pdfPath,
                title: item.title,
                chapterPage: item.chapterPage,
                chapterTitle: item.chapterTitle
              })}
            >
              <Ionicons name="book" size={16} color="#FFF" />
              <Text style={styles.actionButtonText}>Read Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.buyButton]}
              onPress={() => addToCart(item)}
            >
              <Ionicons name="cart" size={16} color="#FFF" />
              <Text style={styles.actionButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#512904ff', '#211c30ff', '#8c4103c6']}
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
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LottieView
                source={require('../../assets/animations/Book.json')}
                autoPlay
                loop
                style={styles.headerAnimation}
              />
              <View>
                <Text style={styles.title}>Risaa Book Store</Text>
                <Text style={styles.subtitle}>Explore Oromo Literature</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cartIcon}>
              <Ionicons name="cart" size={24} color="#FFF" />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Text style={styles.sectionTitle}>Featured Books</Text>
            <Text style={styles.sectionSubtitle}>Select a book to read or purchase</Text>

            <FlatList
              data={RisaaCollections}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCollectionItem}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.listContent}
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
              <Ionicons name="exit" size={40} color="#1a5f9c" style={styles.modalIcon} />
              <Text style={styles.modalText}>
                Are you sure you want to exit?
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => BackHandler.exitApp()}
                  style={[styles.modalButton, styles.modalButtonPrimary]}
                >
                  <Text style={styles.modalButtonTextPrimary}>Yes, Exit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setExitModalVisible(false)}
                  style={[styles.modalButton, styles.modalButtonSecondary]}
                >
                  <Text style={styles.modalButtonTextSecondary}>Cancel</Text>
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
  background: { flex: 1 },
  topShape: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(173, 92, 92, 0.23)',
  },
  bottomShape: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(145, 131, 188, 0.2)',
  },
  container: { 
    flex: 1, 
    paddingTop: StatusBar.currentHeight || 20 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAnimation: { 
    width: 50, 
    height: 50, 
    marginRight: 12 
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  cartIcon: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E74C3C',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  contentWrapper: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 10 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContent: { 
    paddingBottom: 20 
  },
  collectionCard: {
    width: (width - 40) / 2,
    backgroundColor: 'rgba(81, 41, 4, 0.9)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  cardContent: {
    padding: 12,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  collectionAuthor: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  priceContainer: {
    marginBottom: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  readButton: {
    backgroundColor: '#1a5f9c',
  },
  buyButton: {
    backgroundColor: '#27ae60',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalText: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333',
  },
  modalActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonPrimary: {
    backgroundColor: '#1a5f9c',
  },
  modalButtonSecondary: {
    backgroundColor: '#e0e0e0',
  },
  modalButtonTextPrimary: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 16 
  },
  modalButtonTextSecondary: { 
    color: '#333', 
    fontWeight: '600', 
    fontSize: 16 
  },
});