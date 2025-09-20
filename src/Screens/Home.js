import React, { useRef, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, app } from '../../firebase';
import {
  View,
  Text,
  StyleSheet,
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
  ScrollView,
  TextInput
} from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from "react-native-edge-to-edge";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RisaaCollections, bookSections } from '../Components/Utils/RisaaColletions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CartsModal from '../Components/Modals/CartsModal';
import FavoriteContext, { useFavorites } from '../Provider/favoriteProvider';
const { width, height } = Dimensions.get('window');
import { themeColors } from '../Components/Utils/color';

export default function Home({ navigation }) {
  // User state and profile image
  const [user, setUser] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        try {
          const firestore = getFirestore(app);
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProfileImageURL(data.profileImageURL || '');
          } else {
            setProfileImageURL('');
          }
        } catch {
          setProfileImageURL('');
        }
      } else {
        setUser(null);
        setProfileImageURL('');
      }
    };
    fetchUserProfile();
    // Optionally, add a listener for auth state changes if needed
  }, []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Filter out the 'selling' category from bookSections
  const filteredBookSections = bookSections.filter(section => section.id !== 'selling');

  // Category options for filtering (excluding 'selling')
  const categoryOptions = [
    { id: 'all', label: 'All' },
    ...filteredBookSections.map(section => ({ id: section.id, label: section.title }))
  ];

  // Category tab icons mapping
  const categoryTabIcons = {
    all: 'apps',
    featured: 'star',
    new: 'sparkles',
    free: 'gift',
    popular: 'flame',
  };

  // Filtered sections based on selected category
  const filteredSections = selectedCategory === 'all'
    ? filteredBookSections
    : filteredBookSections.filter(section => section.id === selectedCategory);
    
  // Remove book from cart
  const removeBookFromCart = (bookId) => {
    const updatedCart = cartItems.filter(item => item.id !== bookId);
    setCartItems(updatedCart);
    ToastAndroid.show('Removed from cart', ToastAndroid.SHORT);
  };
  
  const [backPressCount, setBackPressCount] = useState(0);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartsModalVisible, setCartsModalVisible] = useState(false);

  // Load cart items from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem('cartItems');
        if (stored) setCartItems(JSON.parse(stored));
      } catch {}
    };
    loadCart();
  }, []);

  // Save cart items to AsyncStorage whenever cartItems changes
  useEffect(() => {
    AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Make 'Siitolii' (id: 1) and 'Dhaloota Sodaa Cabse' (id: 2) free for all users
  const [unlockedBooks, setUnlockedBooks] = useState([1, 2]);

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

  // Filter books based on search query
  const filteredBooks = searchQuery 
    ? RisaaCollections.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : RisaaCollections;

  // // Back press handler
  // useEffect(() => {
  //   let backPressTimer;
  //   const onBackPress = () => {
  //     if (exitModalVisible) return true;
  //     if (backPressCount === 0) {
  //       setBackPressCount(1);
  //       ToastAndroid.show('Double press to exit', ToastAndroid.SHORT);
  //       backPressTimer = setTimeout(() => setBackPressCount(0), 2000);
  //       return true;
  //     } else {
  //       setExitModalVisible(true);
  //       return true;
  //     }
  //   };
  //   const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   return () => {
  //     subscription.remove();
  //     clearTimeout(backPressTimer);
  //   };
  // }, [backPressCount, exitModalVisible]);

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
    if (cartItems.some(item => item.id === book.id)) {
      ToastAndroid.show('Already added to cart', ToastAndroid.SHORT);
      return;
    }
    setCartItems([...cartItems, book]);
    ToastAndroid.show(`${book.title} added to cart`, ToastAndroid.SHORT);
  };

  const isBookUnlocked = (bookId) => {
    return unlockedBooks.includes(bookId);
  };
  const handleFavoriteToggle = (bookId) => {
    if (isFavorite(bookId)) {
      removeFavorite(bookId);
    } else {
      addFavorite(bookId);
    }
  }

  // Render book card based on card style and section
  const renderBookCard = ({ item, index, cardStyle = 'default' }) => {
    // Section-specific layouts
    if (cardStyle === 'popular' || cardStyle === 'new') {
      // Horizontal card: image left, details right
      return (
        <Animated.View style={[styles.collectionCard, styles.horizontalCard, { opacity: fadeAnim }]}>
          <View style={styles.horizontalImageWrap}>
            <Image source={item.image} style={styles.horizontalImage} />
          </View>
          <View style={styles.horizontalContent}>
            <Text style={styles.collectionTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.collectionAuthor} numberOfLines={1}>By {item.author}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color={themeColors.primary} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={item.price === 0 ? styles.freePriceText : styles.priceText}>
              {item.price === 0 ? 'FREE' : `$${item.price}`}
            </Text>
            <View style={styles.buttonContainer}>
              {isBookUnlocked(item.id) ? (
                <TouchableOpacity style={[styles.actionButton, styles.readButton]} onPress={() => handleOpenBook({ pdfPath: item.pdfPath, title: item.title, chapterPage: item.chapterPage, chapterTitle: item.chapterTitle })}>
                  <Ionicons name="book" size={16} color={themeColors.textPrimary} />
                  <Text style={styles.actionButtonText}>Read Now</Text>
                </TouchableOpacity>
              ) : cartItems.some(cart => cart.id === item.id) ? (
                <TouchableOpacity style={[styles.actionButton, styles.addedButton]} disabled>
                  <Ionicons name="checkmark" size={16} color={themeColors.textPrimary} />
                  <Text style={styles.actionButtonText}>Added to Cart</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.actionButton, styles.buyButton]} onPress={() => addToCart(item)}>
                  <Ionicons name="cart" size={16} color={themeColors.textPrimary} />
                  <Text style={styles.actionButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
                <TouchableOpacity style={[styles.actionButton1, styles.addedButton]} onPress={handleFavoriteToggle}>
                  <Ionicons name="heart" size={16} color={themeColors.textPrimary} />
                  <Text style={styles.actionButtonText}>Favorite</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      );
    }

    // Featured & Free: prominent tag/button
    let tag = null;
    if (cardStyle === 'featured') {
      tag = (
        <View style={styles.featuredTag}>
          <Ionicons name="star" size={14} color={themeColors.textPrimary} />
          <Text style={styles.featuredTagText}>Featured</Text>
        </View>
      );
    } else if (cardStyle === 'free') {
      tag = (
        <View style={styles.freeTag}>
          <Ionicons name="gift" size={14} color={themeColors.textPrimary} />
          <Text style={styles.freeTagText}>FREE</Text>
        </View>
      );
    }

    return (
      <Animated.View 
        style={[styles.collectionCard, cardStyle === 'featured' && styles.featuredCard, cardStyle === 'free' && styles.freeCard, { opacity: fadeAnim }]}
      >
        <View style={[styles.imageContainer, { height: 120 }]}>
          <Image source={item.image} style={styles.collectionImage} />
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color={themeColors.primary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          {tag}
          {!isBookUnlocked(item.id) && (
            <View style={styles.lockedOverlay}>
              <Ionicons name="lock-closed" size={24} color={themeColors.textPrimary} />
              <Text style={styles.lockedText}>Purchase to unlock</Text>
            </View>
          )}
        </View>
        <View style={[styles.cardContent, { padding: 8 }]}>
          <Text style={styles.collectionTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.collectionAuthor} numberOfLines={1}>By {item.author}</Text>
          <View style={styles.priceContainer}>
            <Text style={item.price === 0 ? styles.freePriceText : styles.priceText}>
              {item.price === 0 ? 'FREE' : `$${item.price}`}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {isBookUnlocked(item.id) ? (
              <TouchableOpacity style={[styles.actionButton, styles.readButton]} onPress={() => handleOpenBook({ pdfPath: item.pdfPath, title: item.title, chapterPage: item.chapterPage, chapterTitle: item.chapterTitle })}>
                <Ionicons name="book" size={16} color={themeColors.textPrimary} />
                <Text style={styles.actionButtonText}>Read Now</Text>
              </TouchableOpacity>
            ) : cartItems.some(cart => cart.id === item.id) ? (
              <TouchableOpacity style={[styles.actionButton, styles.addedButton]} disabled>
                <Ionicons name="checkmark" size={16} color={themeColors.textPrimary} />
                <Text style={styles.actionButtonText}>Added to Cart</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.actionButton, styles.buyButton]} onPress={() => addToCart(item)}>
                <Ionicons name="cart" size={16} color={themeColors.textPrimary} />
                <Text style={styles.actionButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  // Render section based on layout type
  const renderSection = (section) => {
    const sectionBooks = section.filter(filteredBooks);
    
    if (sectionBooks.length === 0) return null;

    return (
      <View style={{ marginBottom: section.layout === 'horizontal' ? 20 : 24 }} key={section.id}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
        
        {section.layout === 'horizontal' ? (
          <FlatList
            key={`section-${section.id}-horizontal`}
            data={sectionBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderBookCard({ item, index, cardStyle: section.cardStyle })}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        ) : (
          <FlatList
            key={`section-${section.id}-2col`}
            data={sectionBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderBookCard({ item, index, cardStyle: section.cardStyle })}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.verticalListContent}
          />
        )}
      </View>
    );
  };

  const handleToggleFavorite = (bookId) => {
    if (isFavorite(bookId)) {
      removeFavorite(bookId);
    } else {
      addFavorite(bookId);
    }
  };
  const handleNotification = () => {
    navigation.navigate('RootStack', { screen: 'Notification' });
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
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
                <Text style={styles.title}>Risaa BookStore</Text>
                <Text style={styles.subtitle}>Explore Oromo Literature</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cartIcon} onPress={() => setCartsModalVisible(true)}>
              <Ionicons name="cart" size={24} color={themeColors.textPrimary} />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>              
            <TouchableOpacity style={styles.cartIcon} onPress={handleNotification}>
              <Ionicons name="notifications" size={24} color={themeColors.textPrimary} />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>            
            <TouchableOpacity style={styles.cartIcon} onPress={() => {navigation.navigate('Profile');}}>
              {user && profileImageURL ? (
                <Image
                  source={{ uri: profileImageURL }}
                  style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: themeColors.backgroundLight }}
                />
              ) : (
                <Ionicons name="person" size={24} color={themeColors.textPrimary} />
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons 
              name="search" 
              size={20} 
              color={isSearchFocused ? themeColors.primary : themeColors.textSecondary} 
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                isSearchFocused && styles.searchInputFocused
              ]}
              placeholder="Search books, authors..."
              placeholderTextColor={themeColors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
            {/* Category Filter Bar */}
            <View style={{ marginBottom: 16 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
              >
                {categoryOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => setSelectedCategory(option.id)}
                    activeOpacity={0.85}
                    style={[styles.categoryButton, selectedCategory === option.id && styles.categoryButtonActive]}
                  >
                    <Ionicons
                      name={categoryTabIcons[option.id] || 'ellipse'}
                      size={12}
                      color={selectedCategory === option.id ? themeColors.textPrimary : themeColors.primary}
                      style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.categoryButtonText, selectedCategory === option.id && styles.categoryButtonTextActive]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          <ScrollView style={styles.contentWrapper} showsVerticalScrollIndicator={false}>
            {/* Show search results or regular sections */}
            {searchQuery ? (
              <View style={{ marginBottom: 24 }}>
                <Text style={styles.sectionTitle}>Search Results</Text>
                {filteredBooks.length > 0 ? (
                  <FlatList
                    key={`search-2col`}
                    data={filteredBooks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => renderBookCard({ item, index })}
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                  />
                ) : (
                  <View style={styles.noResultsContainer}>
                    <Ionicons name="search" size={48} color={themeColors.textSecondary} />
                    <Text style={styles.noResultsText}>No books found</Text>
                    <Text style={styles.noResultsSubtext}>Try different keywords</Text>
                  </View>
                )}
              </View>
            ) : (
              filteredSections.map(section => renderSection(section))
            )}
          </ScrollView>
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
              <Ionicons name="exit" size={40} color={themeColors.primary} style={styles.modalIcon} />
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
        
        {/* Carts Modal */}
        <CartsModal
          visible={cartsModalVisible}
          onClose={() => setCartsModalVisible(false)}
          cartItems={cartItems}
          onRemoveBook={removeBookFromCart}
        />
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
    backgroundColor: themeColors.cardShadow,
  },
  bottomShape: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: themeColors.cardShadow,
  },
  container: { 
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAnimation: { 
    width: 25, 
    height: 25, 
    marginRight: 12 
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: themeColors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: themeColors.textSecondary,
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
    backgroundColor: themeColors.danger,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: themeColors.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.cardBackground,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: themeColors.textPrimary,
    fontSize: 12,
  },
  searchInputFocused: {
    borderColor: themeColors.primary,
  },
  contentWrapper: { 
    flex: 1, 
    paddingHorizontal: 16,
  },
  categoryContainer: {
    paddingHorizontal: 2,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginHorizontal: 6,
    marginVertical: 2,
    backgroundColor: themeColors.cardBackground,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
  },
  categoryButtonActive: {
    backgroundColor: themeColors.primary,
    borderColor: themeColors.primary,
    shadowColor: themeColors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryButtonText: {
    color: themeColors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  categoryButtonTextActive: {
    color: themeColors.textPrimary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
  },
  horizontalListContent: {
    paddingVertical: 6,
  },
  verticalListContent: {
    paddingVertical: 6,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listContent: { 
    paddingBottom: 16 
  },
  collectionCard: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
    width: (width - 44) / 2, // Fixed width for all cards
  },
  featuredCard: {
    shadowColor: themeColors.primary,
    shadowOpacity: 0.3,
    elevation: 5,
  },
  freeCard: {
    borderColor: themeColors.success,
  },
  horizontalCard: {
    flexDirection: 'row',
    width: width - 32,
    minHeight: 140,
    alignItems: 'center',
    padding: 8,
  },
  horizontalImageWrap: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featuredTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  featuredTagText: {
    color: themeColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 11,
    marginLeft: 3,
  },
  freeTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: themeColors.success,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  freeTagText: {
    color: themeColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 11,
    marginLeft: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.cardShadow,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: themeColors.textPrimary,
    fontSize: 11,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: themeColors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: themeColors.textPrimary,
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  collectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: themeColors.textPrimary,
    marginBottom: 3,
  },
  collectionAuthor: {
    fontSize: 11,
    color: themeColors.textSecondary,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  priceContainer: {
    marginBottom: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themeColors.primary,
  },
  freePriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themeColors.success,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  actionButton1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  readButton: {
    backgroundColor: themeColors.primary,
  },
  buyButton: {
    backgroundColor: themeColors.success,
  },
  addedButton: {
    backgroundColor: themeColors.cardBorder,
    opacity: 0.8,
  },
  actionButtonText: {
    color: themeColors.textPrimary,
    fontWeight: '600',
    fontSize: 11,
    marginLeft: 3,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: themeColors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: themeColors.modalBackground,
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
    color: themeColors.textOnLight,
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
    backgroundColor: themeColors.primary,
  },
  modalButtonSecondary: {
    backgroundColor: themeColors.backgroundLight,
  },
  modalButtonTextPrimary: { 
    color: themeColors.textPrimary, 
    fontWeight: '600', 
    fontSize: 16 
  },
  modalButtonTextSecondary: { 
    color: themeColors.textOnLight, 
    fontWeight: '600', 
    fontSize: 16 
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: themeColors.cardBackground,
    borderRadius: 20,
    padding: 6,
    elevation: 4,
  },
  favoriteIcon: {
    color: themeColors.primary,
  },
});