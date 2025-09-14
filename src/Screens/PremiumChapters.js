import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ChapterDrawer from '../Components/ChapterDrawer';
import ChapterPDF from '../Components/ChapterPDF';

export default function PremiumChapters({ navigation }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleChapterSelect = (pageNumber) => {
    // Convert page number to chapter number
    const chapterPages = {
      48: 1, 81: 2, 188: 3, 277: 4, 
      286: 5, 368: 6, 390: 7, 439: 8, 
      483: 9, 533: 10
    };
    
    const chapter = chapterPages[pageNumber];
    if (chapter) {
      setSelectedChapter(chapter);
      setDrawerVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {selectedChapter ? (
        <ChapterPDF 
          chapterNumber={selectedChapter} 
          onBack={() => setSelectedChapter(null)}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Premium Chapters</Text>
          <Text style={styles.emptyText}>
            Select a chapter from the drawer to start reading
          </Text>
          <TouchableOpacity 
            style={styles.drawerButton}
            onPress={() => setDrawerVisible(true)}
          >
            <Text style={styles.drawerButtonText}>Open Chapter List</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ChapterDrawer
        visible={drawerVisible}
        currentPage={selectedChapter}
        onClose={() => setDrawerVisible(false)}
        onChapterSelect={handleChapterSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a6fa5',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  drawerButton: {
    backgroundColor: '#4a6fa5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  drawerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});