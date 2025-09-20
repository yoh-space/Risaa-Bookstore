import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebase';
import { themeColors } from '../Utils/color';

const firestore = getFirestore(app);

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.primary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <View style={styles.userRow}>
                <Image
                  source={item.profileImageURL ? { uri: item.profileImageURL } : require('../../../assets/images/kadiir.png')}
                  style={styles.profileImage}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.userName}>{item.displayName || 'No Name'}</Text>
                  <Text style={styles.userEmail}>{item.email || 'No Email'}</Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No users found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColors.primary,
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: themeColors.cardBackground,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.backgroundLight,
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  userEmail: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: themeColors.textMuted,
    marginTop: 32,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.backgroundLight,
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
});


