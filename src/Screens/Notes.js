import React, { useState, useEffect, useCallback } from "react";
import LottieView from 'lottie-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Button
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Orientation from "react-native-orientation-locker";
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { SystemBars } from "react-native-edge-to-edge";
const adUnitId = 'ca-app-pub-7604915619325589/3947033537';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});
const { width, height } = Dimensions.get('window');

const Notes = ({ onBack, initialTitle = "", initialContent = "" }) => {
  const [notes, setNotes] = useState([]);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialContent);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isViewingNote, setIsViewingNote] = useState(false);

  // Color palette for note backgrounds
  const noteColors = [
    "#dda0dd", "turquoise", "teal", "#f4fff5", "#add8e6","mediumturquoise",
    "palegoldenrod", "#fff9f4", "#f0f8ff", "#fff8f0","#fff8dc","lightsteelblue"
  ];
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    loadNotes();
    
    if (initialTitle || initialContent) {
      setTitle(initialTitle);
      setText(initialContent);
      if (!isNoteModalOpen) {
        setNoteModalOpen(true);
      }
    }
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
      setFilteredNotes(newNotes);
    } catch (error) {
      Alert.alert("Error", "Failed to save notes.");
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        setFilteredNotes(parsedNotes);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load notes.");
    }
  };

  const onSaveNote = useCallback(() => {
    if (!title || !text) {
      Alert.alert("Missing Content", "Please enter both a title and note content.");
      return;
    }

    let updatedNotes = [...notes];
    const noteData = { 
      title, 
      content: text, 
      color: selectedColor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (selectedIndex !== null) {
      updatedNotes[selectedIndex] = {
        ...updatedNotes[selectedIndex],
        ...noteData,
        updatedAt: new Date().toISOString()
      };
    } else {
      updatedNotes.push(noteData);
    }

    saveNotes(updatedNotes);
    setNoteModalOpen(false);
    setSelectedIndex(null);
    setTitle("");
    setText("");
    setIsViewingNote(false);
  }, [title, text, notes, selectedColor]);

  const onNotePress = (filteredIndex) => {
    const originalIndex = filteredNotes[filteredIndex].originalIndex;
    setSelectedIndex(originalIndex);
    setTitle(notes[originalIndex].title);
    setText(notes[originalIndex].content);
    setSelectedColor(notes[originalIndex].color || "#ffffff");
    setIsViewingNote(true);
    setNoteModalOpen(true);
  };

  const onEditNote = () => {
    setIsViewingNote(false);
  };

  const onDeleteNote = (index) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedNotes = notes.filter((_, i) => i !== index);
          saveNotes(updatedNotes);
        },
      },
    ]);
  };

  useEffect(() => {
    if (searchText) {
      setFilteredNotes(
        notes
          .map((note, originalIndex) => ({ ...note, originalIndex })) // Add originalIndex
          .filter((note) =>
            note.title.toLowerCase().includes(searchText.toLowerCase()) ||
            note.content.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    } else {
      setFilteredNotes(notes.map((note, originalIndex) => ({ ...note, originalIndex })));
    }
  }, [searchText, notes]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setInterstitialLoaded(false); // Reset for next ad load
      interstitial.load(); // Load a new ad after one is closed
    });

    interstitial.load(); // Initial load

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showInterstitial = () => {
    if (interstitialLoaded) {
      interstitial.show();
    } else {
      console.log('Interstitial not loaded yet.');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#581601ff", flex: 1 }}>
      <View style={styles.backgroundAnimation} pointerEvents="none">
      <SystemBars style='light'/>
        <LottieView
          source={require('../../assets/animations/Books.json')}
          autoPlay
          loop
          style={styles.lottieBg}
        />
      </View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
          activeOpacity={0.6}
          hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}
        >
          <Icons 
            name="chevron-left" 
            size={26} 
            color="white"
            style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2 }}
          />
        </TouchableOpacity>

        {/* Title with subtle text shine */}
        <Text style={styles.headerTitle}>
          My Notes
        </Text>

        {/* Search bar with premium effects */}
        <View style={styles.searchWrapper}>
          <View style={[
            styles.searchContainer,
            searchText && styles.searchContainerActive
          ]}>
            <Icons 
              name="magnify" 
              size={16} 
              color="white" 
              style={[
                styles.searchIcon, 
                searchText && { transform: [{ scale: 1.1 }] }
              ]} 
            />
            <TextInput
              placeholder="Search Notes..."
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
              selectionColor="white"
              returnKeyType="search"
            />
            {searchText && (
              <TouchableOpacity 
                onPress={() => setSearchText("")}
                style={styles.clearButton}
              >
                <Icons 
                  name="close-circle" 
                  size={18} 
                  color="white"
                  style={{ opacity: 0.8 }}
                />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Animated underline (my signature touch) */}
          <View style={[
            styles.searchUnderline,
            { 
              width: searchText ? '100%' : '0%',
              opacity: searchText ? 1 : 0
            }
          ]}/>
        </View>
      </View>

      {/* Notes Grid */}
      <ScrollView contentContainerStyle={styles.notesContainer}>
        {filteredNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <LottieView
              source={require('../../assets/animations/Books.json')}
              autoPlay
              loop
              style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 10, opacity: 0.7 }}
            />
            <Text style={styles.emptyStateText}>No notes yet</Text>
            <Text style={styles.emptyStateSubtext}>Tap the + button to create one</Text>
          </View>
        ) : (
          <View style={styles.notesGrid}>
            {filteredNotes.map((note, filteredIndex) => (
              <TouchableOpacity
                key={filteredIndex}
                onPress={() => onNotePress(filteredIndex)}
                onLongPress={() => onDeleteNote(note.originalIndex)}
                activeOpacity={0.8}
              >
                <View style={[styles.noteCard, { backgroundColor: note.color || "#ffffff" }]}>
                  <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
                  <Text style={styles.noteContent} numberOfLines={4}>{note.content}</Text>
                  {note.updatedAt && (
                    <Text style={styles.noteDate}>{formatDate(note.updatedAt)}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </ScrollView>

      {/* Add Note Button */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => { 
          setTitle(""); 
          setText(""); 
          setSelectedColor("#ffffff");
          setIsViewingNote(false); 
          setNoteModalOpen(true); 
          if (interstitialLoaded) {
            showInterstitial();
          }
        }}
        activeOpacity={0.8}
      >
        <LottieView
          source={require('../../assets/animations/addNote.json')}
          autoPlay
          loop
          style={{ width: 70, height: 70 }}
        />
        <Text style={styles.floatingButtonText}>Add Note</Text>
      </TouchableOpacity>

      {/* Note Editor Modal */}
      <Modal 
        visible={isNoteModalOpen} 
        transparent 
        animationType="slide"
        onRequestClose={() => setNoteModalOpen(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContainer, { backgroundColor: selectedColor || "#ffffff" }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              {isViewingNote ? (
                <>
                  <TouchableOpacity 
                    onPress={() => setNoteModalOpen(false)} 
                    style={styles.modalActionButton}
                  >
                    <Icons name="chevron-left" size={28} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={onEditNote} 
                    style={[styles.modalActionButton, { marginLeft: 'auto' }]}
                  >
                    <Icons name="pencil" size={20} color="#333" />
                    <Text style={styles.modalActionText}>Edit</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity 
                    onPress={() => {
                      if (title || text) {
                        Alert.alert(
                          "Discard Changes", 
                          "Are you sure you want to discard this note?", 
                          [
                            { text: "Cancel", style: "cancel" },
                            {
                              text: "Discard",
                              style: "destructive",
                              onPress: () => {
                                setNoteModalOpen(false);
                                setTitle("");
                                setText("");
                              },
                            },
                          ]
                        );
                      } else {
                        setNoteModalOpen(false);
                      }
                    }} 
                    style={styles.modalActionButton}
                  >
                    <Icons name="chevron-left" size={28} color="#333" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={onSaveNote} 
                    style={[styles.modalActionButton, { marginLeft: 'auto' }]}
                    disabled={!title || !text}
                  >
                    <Icons 
                      name="content-save" 
                      size={22} 
                      color={(!title || !text) ? "#aaa" : "#1a73e8"} 
                    />
                    <Text style={[styles.modalActionText, { 
                      color: (!title || !text) ? "#aaa" : "#1a73e8" 
                    }]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Note Content */}
            {isViewingNote ? (
              <ScrollView style={styles.viewContent}>
                <Text style={styles.viewTitle}>{title}</Text>
                <Text style={styles.viewText}>{text}</Text>
                {notes[selectedIndex]?.updatedAt && (
                  <Text style={styles.viewDate}>
                    Last updated: {formatDate(notes[selectedIndex].updatedAt)}
                  </Text>
                )}
              </ScrollView>
            ) : (
              <View style={styles.editContent}>
                <TextInput 
                  style={styles.titleInput} 
                  placeholder="Note title" 
                  placeholderTextColor="#888"
                  value={title} 
                  onChangeText={setTitle} 
                  selectionColor="#1a73e8"
                  autoFocus={true}
                />
                <TextInput 
                  style={styles.noteInput} 
                  placeholder="Start writing..." 
                  placeholderTextColor="#888"
                  onChangeText={setText} 
                  value={text}
                  selectionColor="#1a73e8"
                  multiline={true}
                  textAlignVertical="top"
                />
                
                {/* Color Picker */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.colorPicker}
                  contentContainerStyle={styles.colorPickerContent}
                >
                  {noteColors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedColor(color)}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        selectedColor === color && styles.selectedColorOption
                      ]}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundAnimation: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  floatingButtonText:{
    fontSize: 12,
    fontWeight: 300,
    color: 'black',
  },
  lottieBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.18,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#512904ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  backButton: {
    marginRight: 12,
    padding: 2,
    transform: [{ translateY: -1 }] // Pixel-perfect alignment
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginRight: 15,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    flexShrink: 1 // Prevents text overflow
  },
  searchWrapper: {
    flex: 1,
    maxWidth: '60%' // Controlled width
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
    height: 36,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  searchContainerActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  searchIcon: {
    marginRight: 8,
    opacity: 0.9,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 13,
    paddingVertical: 0,
    fontWeight: '500',
    includeFontPadding: false, // Perfect vertical align
    height: '100%',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
    borderRadius: 10,
  },
  searchUnderline: {
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    borderRadius: 2,
    alignSelf: 'center',
    transitionDuration: '300ms', // For web/react-native-reanimated
  },
  
  // Notes Grid Styles
  notesContainer: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  notesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noteCard: {
    width: (width - 30) / 2,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 11,
    color: '#888',
    marginTop: 'auto',
  },
  
  // Floating Button
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  modalActionText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#333',
  },
  
  // View Mode Styles
  viewContent: {
    flex: 1,
    paddingTop: 10,
  },
  viewTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  viewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  viewDate: {
    fontSize: 12,
    color: '#605e5dff',
    marginTop: 20,
    marginBottom: 30,
  },
  
  // Edit Mode Styles
  editContent: {
    flex: 1,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    paddingVertical: 5,
    textAlignVertical: 'top',
    height: 400,
  },
  
  // Color Picker
  colorPicker: {
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  colorPickerContent: {
    alignItems: 'center',
    paddingRight: 15,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#1a73e8',
  },
});

export default Notes;