
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeColors } from '../Utils/color';
import { convex } from '../../Services/convexClient';
import { api } from '../../../convex/_generated/api';

const { width, height } = Dimensions.get('window');


export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await convex.query(api.adminDashboard.getAllCategories, {});
      setCategories(res || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={item.icon || 'book-open-page-variant'}
          size={32}
          color={themeColors.primary}
        />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
      {item.description && (
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SystemBars style="light" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SystemBars style="light" />
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="alert-circle" size={48} color={themeColors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SystemBars style="light" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Categories</Text>
        <Text style={styles.subHeaderText}>
          {categories.length} categor{categories.length === 1 ? 'y' : 'ies'} available
        </Text>
      </View>
      
      {categories.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="folder-open" size={48} color={themeColors.textSecondary} />
          <Text style={styles.emptyText}>No categories found</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchCategories();
          }}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  headerContainer: {
    paddingTop: 32,
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: themeColors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 14,
    color: themeColors.textSecondary,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 16,
    color: themeColors.textPrimary,
    fontSize: 16,
  },
  errorText: {
    marginTop: 16,
    color: themeColors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    color: themeColors.textSecondary,
    fontSize: 16,
    fontStyle: 'italic',
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: themeColors.cardBackground,
    margin: 8,
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
    minHeight: 140,
  },
  iconWrap: {
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: themeColors.textPrimary,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: themeColors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});