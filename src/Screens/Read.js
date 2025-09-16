import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View, Text, Animated, StyleSheet, Dimensions, 
  TextInput, TouchableOpacity, StatusBar, Modal, 
  TouchableWithoutFeedback, ScrollView, BackHandler,
  ActivityIndicator, Alert, Share
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@react-native-assets/slider';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import { InterstitialAd, AdEventType,TestIds } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ChapterDrawer from '../Components/Chapters/ChapterDrawer';
import { SystemBars } from 'react-native-edge-to-edge';

const adUnitId = 'ca-app-pub-7604915619325589/3947033537';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {keywords: ['book', 'oromo history','afaan oromo books']});

export default function Read({ navigation, route }) {
  // Accept pdfPath, title, chapterPage, chapterTitle from navigation params, fallback to default
  const { pdfPath: navPdfPath, title: navTitle, chapterPage, chapterTitle } = route?.params || {};
  const defaultSource = { uri: 'bundle-assets://ormoo.pdf' };
  const pdfSource = navPdfPath && navPdfPath.uri ? navPdfPath : defaultSource;
  const bookTitle = navTitle || 'Risaa BookStore';
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [isStatusBarHidden, setIsStatusBarHidden] = useState(false);
  const [isHeaderFooterVisible, setIsHeaderFooterVisible] = useState(true);
  const [isHLScroll, setIsHLScroll] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isPremiumVisible, setIsPremiumVisible] = useState(false);
  const [premiumSource, setPremiumSource] = useState(null);
  const [premiumTitle, setPremiumTitle] = useState('');
  const [selectedPremiumKey, setSelectedPremiumKey] = useState(null);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [totalPage, setTotalPage] = useState(1); // Default for main book
  const [unlockedPremiumChapters, setUnlockedPremiumChapters] = useState({});
  // Load unlocked state for all premium chapters
  useEffect(() => {
    const fetchUnlocked = async () => {
      const unlocked = {};
      for (const key of Object.keys(premiumChapters)) {
        const val = await AsyncStorage.getItem(`chapter_unlocked_${key}`);
        unlocked[key] = val === 'true';
      }
      setUnlockedPremiumChapters(unlocked);
    };
    fetchUnlocked();
  }, [isDrawerVisible, isPremiumVisible]);

  // Refs
  const pdfRef = useRef(null);

  // Handle back button press
  useEffect(() => {
    const onBackPress = () => {
      if (isPremiumVisible) {
        setIsPremiumVisible(false);
        return true;
      }
      navigation.goBack();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [navigation, isPremiumVisible]);

  // Load interstitial ad
  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => setInterstitialLoaded(true)
    );
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      async () => {
        setInterstitialLoaded(false);
        // Unlock the chapter if user just watched the ad
        if (selectedPremiumKey && !premiumSource) {
          // Mark as unlocked
          await AsyncStorage.setItem(`chapter_unlocked_${selectedPremiumKey}`, 'true');
          setUnlockedPremiumChapters((prev) => ({ ...prev, [selectedPremiumKey]: true }));
          // Show the chapter
          const chapter = premiumChapters[selectedPremiumKey];
          setPremiumSource({ uri: chapter.uri });
          setPremiumTitle(chapter.title);
        }
        interstitial.load();
      }
    );
    const unsubscribeFailed = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        setInterstitialLoaded(false);
      }
    );
    interstitial.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [selectedPremiumKey, premiumSource, premiumChapters]);

  // Fade animation for loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle page navigation
  const handlePageSearch = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= 80) {
      pdfRef.current?.setPage(pageNumber);
      setCurrentPage(pageNumber);
      setInputPage('');
    } else {
      Alert.alert('Invalid Page', 'Please enter a page number between 1 and 544.');
    }
  };

  // Handle chapter selection
const premiumChapters = React.useMemo(() => ({
  48: { title: 'Chapter 1: Risaa BookStore', uri: 'bundle-assets://ormoo-48-80.pdf' },
  81: { title: 'Chapter 2: Risaa BookStore', uri: 'bundle-assets://ormoo-81-187.pdf' },
  188: { title: 'Chapter 3: Risaa BookStore', uri: 'bundle-assets://ormoo-188-276.pdf' },
  277: { title: 'Chapter 4: Risaa BookStore', uri: 'bundle-assets://ormoo-277-285.pdf' },
  286: { title: 'Chapter 5: Risaa BookStore', uri: 'bundle-assets://ormoo-286-367.pdf' },
  368: { title: 'Chapter 6: Risaa BookStore', uri: 'bundle-assets://ormoo-368-389.pdf' },
  390: { title: 'Chapter 7: Risaa BookStore', uri: 'bundle-assets://ormoo-390-438.pdf' },
  439: { title: 'Chapter 8: Risaa BookStore', uri: 'bundle-assets://ormoo-439-482.pdf' },
  483: { title: 'Chapter 9: Risaa BookStore', uri: 'bundle-assets://ormoo-483-532.pdf' },
  533: { title: 'Chapter 10: Risaa BookStore', uri: 'bundle-assets://ormoo-533-544.pdf' },
}), []);

const handleChapterSelect = async (pageNumber) => {
  if (premiumChapters[pageNumber]) {
    // Check unlock state
    const unlocked = await AsyncStorage.getItem(`chapter_unlocked_${pageNumber}`);
    if (unlocked === 'true') {
      setPremiumSource({ uri: premiumChapters[pageNumber].uri });
      setPremiumTitle(premiumChapters[pageNumber].title);
      setIsPremiumVisible(true);
      setIsDrawerVisible(false);
    } else {
      setSelectedPremiumKey(pageNumber);
      setIsPremiumVisible(true);
      setPremiumSource(null);
      setPremiumTitle('');
      setIsDrawerVisible(false);
      // Show interstitial ad to unlock
      if (interstitialLoaded) {
        interstitial.show();
      } else {
        Alert.alert('Ad not ready', 'The ad is still loading. Please try again in a moment.');
      }
    }
  } else {
    pdfRef.current?.setPage(pageNumber);
    setCurrentPage(pageNumber);
    setIsDrawerVisible(false);
  }
};

const onSlidingComplete = (value) => {
  const page = Math.round(value);
  setCurrentPage(page);
  pdfRef.current?.setPage(page); // This line ensures the PDF page changes
  setIsHLScroll(value === 1);
};

  // Toggle orientation
  const handleOrientation = () => {
    Orientation.getOrientation((orientation) => {
      if (orientation === 'PORTRAIT') {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
    });
    setIsModalVisible(false);
  };

  // Handle PDF load complete
  const handlePdfLoadComplete = (numberOfPages) => {
    setTotalPage(numberOfPages);
    setIsLoading(false);
  };

  // Show premium chapters: open the drawer instead of setting isPremiumVisible
  const showPremiumChapters = () => {
    setIsDrawerVisible(true);
    setIsModalVisible(false);
  };
  const handleSingleTap = () => {
    setIsHeaderFooterVisible((prev) => !prev);
    setIsStatusBarHidden((prev) => !prev);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
        <Text style={styles.loadingText}>Loading Your Book...</Text>
      </View>
    );
  }

if (isPremiumVisible) {
  if (selectedPremiumKey && premiumChapters[selectedPremiumKey]) {
    const chapter = premiumChapters[selectedPremiumKey];
    if (premiumSource) {
      return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}> 
          <SystemBars style='light' />
            <StatusBar
              translucent
              backgroundColor="#1E3A8A"
              barStyle="light-content"
              hidden={isStatusBarHidden}
            />
            {/* Header */}
            {isHeaderFooterVisible && (
            <LinearGradient 
              colors={["#1E3A8A", "#3B82F6"]} 
              style={styles.header}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            >
              <View style={styles.headerContent}>
                <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => setIsDrawerVisible(true)}
                  activeOpacity={0.7}
                >
                  <Icons name="view-list" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{premiumTitle || chapter.title}</Text>
                <View style={styles.searchContainer}>
                  <TextInput
                    placeholder="Go to page..."
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="numeric"
                    value={inputPage}
                    onChangeText={setInputPage}
                    onSubmitEditing={handlePageSearch}
                    style={[styles.searchInput, { fontSize: 10, paddingHorizontal: 3 }]}
                  />
                  <TouchableOpacity 
                    onPress={handlePageSearch} 
                    style={styles.searchButton}
                    activeOpacity={0.7}
                  >
                    <Icons name="arrow-right" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>              
            )}

            {/* Chapter Drawer */}
            <ChapterDrawer
              visible={isDrawerVisible}
              currentPage={selectedPremiumKey}
              onClose={() => setIsDrawerVisible(false)}
              onChapterSelect={handleChapterSelect}
              unlockedPremiumChapters={unlockedPremiumChapters}
            />

            {/* PDF Viewer */}
            <View style={styles.pdfContainer}>
              <Pdf
                ref={pdfRef}
                source={{ uri: chapter.uri }}
                style={styles.pdf}
                onLoadComplete={handlePdfLoadComplete}
                onPageChanged={(page) => setCurrentPage(page)}
                onError={(error) => {}}
                horizontal={isHLScroll}
                onPageSingleTap={handleSingleTap}
              />
              {isHeaderFooterVisible && (
              <View style={styles.verticalSliderContainer}>
                <Slider
                  value={currentPage}
                  minimumValue={1}
                  maximumValue={totalPage}
                  step={1}
                  minimumTrackTintColor="#3B82F6"
                  maximumTrackTintColor="#E5E7EB"
                  thumbTintColor="#FF7E5F"
                  vertical={true}
                  onSlidingComplete={onSlidingComplete}
                  trackStyle={styles.sliderTrack}
                />
              </View>                
              )}
            </View>

            {/* Footer */}
            { isHeaderFooterVisible && (
            <LinearGradient 
              colors={["#3B82F6", "#1E3A8A"]} 
              style={styles.footer}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 1}}
            >
              <View style={styles.footerContent}>
                <View style={styles.pageInfo}>
                  <Icons name="book-open-page-variant" size={20} color="white" />
                  <Text style={styles.footerText}>{`  ${currentPage}/${totalPage}`}</Text>
                </View>
                <View style={styles.footerIcons}>
                  <TouchableOpacity 
                    onPress={() =>{
                      setIsModalVisible(true)
                    }}
                    activeOpacity={0.7}
                  >
                    <Icons name="menu" size={24} color="white" style={styles.footerIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>              
            )}
          {/* Options Modal (for premium chapter view) */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.bottomSheet}>
                  <View style={styles.dragHandle} />
                  <View style={styles.bottomSheetContent}>
                    <Text style={styles.bottomSheetTitle}>Reading Options</Text>
                    <ScrollView contentContainerStyle={styles.optionsContainer}>
                      <View style={styles.optionsGrid}>
                        {/* Chapters */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={showPremiumChapters}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={require('../../assets/animations/premium.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50 }}
                            />
                          </View>
                          <Text style={styles.optionText}>Premium Chapters</Text>
                        </TouchableOpacity>
                        {/* Orientation */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={handleOrientation}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={require('../../assets/animations/Orientation.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50, backgroundColor: 'rgba(50, 43, 43, 1)', borderRadius: 25 }}
                            />
                          </View>
                          <Text style={styles.optionText}>Orientation</Text>
                        </TouchableOpacity>
                        {/* Scroll Direction */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={() => setIsHLScroll(!isHLScroll)}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={isHLScroll
                                ? require('../../assets/animations/Vertical_scroll.json')
                                : require('../../assets/animations/horizontal_scroll.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50 }}
                            />
                          </View>
                          <Text style={styles.optionText}>
                            {isHLScroll ? "Vertical Scroll" : "Horizontal Scroll"}
                          </Text>
                        </TouchableOpacity>
                        {/* Add Note */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={() => {
                            navigation.navigate('Notes', { page: currentPage, chapter: premiumTitle || chapter.title });
                          }}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={require('../../assets/animations/addNote.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50 }}
                            />
                          </View>
                          <Text style={styles.optionText}>Add Note</Text>
                        </TouchableOpacity>
                        {/* Add Quotes */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={() => {
                            navigation.navigate('Quotes', { page: currentPage, chapter: premiumTitle || chapter.title }); 
                          }}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={require('../../assets/animations/addQuote.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50 }}
                            />
                          </View>
                          <Text style={styles.optionText}>Add Quotes</Text>
                        </TouchableOpacity>
                        {/* Share */}
                        <TouchableOpacity
                          style={styles.optionCard}
                          onPress={() => {
                            setIsModalVisible(false);
                            Share.share({
                              message: 'Check out this amazing book: Handhuuraa Oromoo Arsii',
                            });
                          }}
                        >
                          <View style={styles.optionIconContainer}>
                            <LottieView
                              source={require('../../assets/animations/share.json')}
                              autoPlay
                              loop
                              style={{ width: 50, height: 50 }}
                            />
                          </View>
                          <Text style={styles.optionText}>Share</Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          </Animated.View>
        </SafeAreaView>
      );
    } else {
      // Show a loading indicator or fallback UI while waiting for ad unlock
      return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={{ marginTop: 20, color: '#1E3A8A', fontWeight: 'bold' }}>Preparing your chapter...</Text>
            <TouchableOpacity onPress={() => setIsPremiumVisible(false)} style={{ marginTop: 30 }}>
              <Text style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  } else {
    // Fallback if something went wrong
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <SystemBars style='light' />
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: 'black' }]}>Chapter Not Found</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Unable to load chapter. Please try again.</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setIsPremiumVisible(false)}
          >
            <Text style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: 16 }}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}>
        <StatusBar 
          translucent 
          backgroundColor="#412c06ff" 
          barStyle="light-content" 
          hidden={isStatusBarHidden} 
        />
        <SystemBars style='light' />
        
        {/* Header */}
        {isHeaderFooterVisible && (
        <LinearGradient 
          colors={["#2d0b00ff", "#b95503ff"]} 
          style={styles.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setIsDrawerVisible(true)}
              activeOpacity={0.7}
            >
              <Icons name="view-list" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{bookTitle}</Text>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Go to page..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                keyboardType="numeric"
                value={inputPage}
                onChangeText={setInputPage}
                onSubmitEditing={handlePageSearch}
                style={styles.searchInput}
              />
              <TouchableOpacity 
                onPress={handlePageSearch} 
                style={styles.searchButton}
                activeOpacity={0.7}
              >
                <Icons name="arrow-right" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>          
        )}


        {/* Chapter Drawer */}
        <ChapterDrawer
          visible={isDrawerVisible}
          currentPage={currentPage}
          chapterTitle={chapterTitle}
          chapterPage={chapterPage}
          onClose={() => setIsDrawerVisible(false)}
          onChapterSelect={handleChapterSelect}
          unlockedPremiumChapters={unlockedPremiumChapters}
        />

        {/* PDF Viewer */}
        <View style={styles.pdfContainer}>
          <Pdf
            ref={pdfRef}
            source={navPdfPath}
            onLoadComplete={handlePdfLoadComplete}
            onPageChanged={(page) => setCurrentPage(page)}
            onError={(error) => {}}
            style={styles.pdf}
            horizontal={isHLScroll}
            onPageSingleTap={handleSingleTap}
          />
          {isHeaderFooterVisible && (
          <View style={styles.verticalSliderContainer}>
            <Slider
              value={currentPage}
              minimumValue={1}
              maximumValue={totalPage}
              step={1}
              minimumTrackTintColor="#f36d0eff"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#FF7E5F"
              vertical={true}
              onSlidingComplete={onSlidingComplete}
              trackStyle={styles.sliderTrack}
            />
          </View>            
          )}

        </View>
 
        {/* Footer */}
        { isHeaderFooterVisible && (
        <LinearGradient 
          colors={["#2d0b00ff", "#b95503ff"]} 
          style={styles.footer}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
        >
          <View style={styles.footerContent}>
            <View style={styles.pageInfo}>
              <Icons name="book-open-page-variant" size={20} color="white" />
              <Text style={styles.footerText}>{`  ${currentPage}/${totalPage}`}</Text>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(true)}
                activeOpacity={0.7}
              >
                <Icons name="menu" size={24} color="white" style={styles.footerIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
          )
        }


        {/* Options Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.bottomSheet}>
                <View style={styles.dragHandle} />
                <View style={styles.bottomSheetContent}>
                  <Text style={styles.bottomSheetTitle}>Reading Options</Text>
                  <ScrollView contentContainerStyle={styles.optionsContainer}>
                    <View style={styles.optionsGrid}>
                      {/* Chapters */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={showPremiumChapters}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={require('../../assets/animations/premium.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <Text style={styles.optionText}>Premium Chapters</Text>
                      </TouchableOpacity>

                      {/* Orientation */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={handleOrientation}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={require('../../assets/animations/Orientation.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50, backgroundColor: 'rgba(50, 43, 43, 1)', borderRadius: 25 }}
                          />
                        </View>
                        <Text style={styles.optionText}>Orientation</Text>
                      </TouchableOpacity>

                      {/* Scroll Direction */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => setIsHLScroll(!isHLScroll)}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={isHLScroll
                              ? require('../../assets/animations/Vertical_scroll.json')
                              : require('../../assets/animations/horizontal_scroll.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <Text style={styles.optionText}>
                          {isHLScroll ? "Vertical Scroll" : "Horizontal Scroll"}
                        </Text>
                      </TouchableOpacity>

                      {/* Add Note */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => {
                          setIsNoteVisible(true);
                          setIsModalVisible(false);
                        }}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={require('../../assets/animations/addNote.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <Text style={styles.optionText}>Add Note</Text>
                      </TouchableOpacity>

                      {/* Add Quotes */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => {
                          setIsQuoteVisible(true);
                          setIsModalVisible(false);
                        }}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={require('../../assets/animations/addQuote.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <Text style={styles.optionText}>Add Quotes</Text>
                      </TouchableOpacity>

                      {/* Share */}
                      <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => {
                          setIsModalVisible(false);
                            Share.share({
                              message: 'Check out this amazing book: Risaa BookStore',
                            });
                        }}
                      >
                        <View style={styles.optionIconContainer}>
                          <LottieView
                            source={require('../../assets/animations/share.json')}
                            autoPlay
                            loop
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                        <Text style={styles.optionText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d1200ff',
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 3,
    height: 36,
  },
  searchInput: {
    width: 60,
    color: 'white',
    fontSize: 14,
    paddingVertical: 0,
    marginRight: 5,
  },
  searchButton: {
    padding: 5,
  },
  pdfContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
  },
  pdf: {
    flex: 1,
  },
  verticalSliderContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
    width: 20,
  },
  sliderTrack: {
    borderRadius: 10,
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  footerIcons: {
    flexDirection: 'row',
  },
  footerIcon: {
    marginLeft: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'rgba(103, 43, 4, 0.9)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '60%',
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionsContainer: {
    paddingBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
});