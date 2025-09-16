// src/Components/Modals/ReadOptionsModal.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Share, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const ReadOptionsModal = ({
  visible,
  onClose,
  showPremiumChapters,
  handleOrientation,
  isHLScroll,
  setIsHLScroll,
  setIsModalVisible,
  navigation,
  currentPage,
  chapterTitle,
  styles
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
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
                      source={require('../../../assets/animations/premium.json')}
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
                      source={require('../../../assets/animations/Orientation.json')}
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
                        ? require('../../../assets/animations/Vertical_scroll.json')
                        : require('../../../assets/animations/horizontal_scroll.json')}
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
                    setIsModalVisible(false);
                    navigation.navigate('Notes', { page: currentPage, chapter: chapterTitle });
                  }}
                >
                  <View style={styles.optionIconContainer}>
                    <LottieView
                      source={require('../../../assets/animations/addNote.json')}
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
                    setIsModalVisible(false);
                    navigation.navigate('Quotes', { page: currentPage, chapter: chapterTitle }); 
                  }}
                >
                  <View style={styles.optionIconContainer}>
                    <LottieView
                      source={require('../../../assets/animations/addQuote.json')}
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
                      message: 'Check out this amazing book: Risaa Bookstore App',
                    });
                  }}
                >
                  <View style={styles.optionIconContainer}>
                    <LottieView
                      source={require('../../../assets/animations/share.json')}
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
    </Modal>
  );
};

export default ReadOptionsModal;