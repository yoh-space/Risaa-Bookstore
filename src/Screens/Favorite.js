import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../Components/Utils/color';
import LinearGradient from 'react-native-linear-gradient';
import { useFavorites } from '../Provider/favoriteProvider';
import { RisaaCollections } from '../Components/Utils/RisaaColletions';


export default function Favorite() {
  const { favorites } = useFavorites();
  const favoriteBooks = RisaaCollections.filter(book => favorites.includes(book.id));
  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Favorite Books</Text>
          {favoriteBooks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No favorite books yet.</Text>
            </View>
          ) : (
            favoriteBooks.map(book => (
              <View key={book.id} style={{ margin: 8, padding: 8, backgroundColor: '#fff', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold' }}>{book.title}</Text>
                {/* Add more book details here if needed */}
              </View>
            ))
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: 40,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: themeColors.textSecondary,
    fontSize: 16,
  },
});