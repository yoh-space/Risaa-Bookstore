// src/Components/Modals/PremiumChapterModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Animated
} from 'react-native';
import Pdf from 'react-native-pdf';
import { Slider } from '@react-native-assets/slider';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import { themeColors } from '../Utils/color';

import ChapterDrawer from '../Chapters/ChapterDrawer';
import ReadOptionsModal from './ReadOptionsModal';

const PremiumChapterModal = ({
  isPremiumVisible,
  selectedPremiumKey,
  premiumChapters,
  premiumSource,
  premiumTitle,
  setIsPremiumVisible,
  setIsDrawerVisible,
  isHeaderFooterVisible,
  isStatusBarHidden,
  inputPage,
  setInputPage,
  handlePageSearch,
  currentPage,
  setCurrentPage,
  totalPage,
  onSlidingComplete,
  isHLScroll,
  handleSingleTap,
  handlePdfLoadComplete,
  isModalVisible,
  setIsModalVisible,
  handleOrientation,
  setIsHLScroll,
  navigation,
  unlockedPremiumChapters,
  handleChapterSelect,
  styles
}) => {
  if (!isPremiumVisible) return null;

  if (selectedPremiumKey && premiumChapters[selectedPremiumKey]) {
    const chapter = premiumChapters[selectedPremiumKey];
    if (premiumSource) {
      return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Animated.View style={[styles.mainContainer, { opacity: 1 }]}> 
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
                colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
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
                colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
                style={styles.header}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}          
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
            )}

            {/* Options Modal */}
            <ReadOptionsModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              showPremiumChapters={() => setIsDrawerVisible(true)}
              handleOrientation={handleOrientation}
              isHLScroll={isHLScroll}
              setIsHLScroll={setIsHLScroll}
              setIsModalVisible={setIsModalVisible}
              navigation={navigation}
              currentPage={currentPage}
              chapterTitle={premiumTitle || chapter.title}
              styles={styles}
            />
          </Animated.View>
        </SafeAreaView>
      );
    } else {
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
};

export default PremiumChapterModal;