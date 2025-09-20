import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, app } from '../../../firebase';
import ImagePickerComponent from './ImagePicker';
import { themeColors } from '../Utils/color';

const firestore = getFirestore(app);

export default function ProfileForm({ onSaveComplete }) {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(data.displayName || '');
          setBio(data.bio || '');
          setProfileImageURL(data.profileImageURL || '');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onSave = async () => {
    setIsLoading(true);
    setError('');
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const userDocRef = doc(firestore, 'users', user.uid);
    //   console.log('Saving profile for:', user.uid, displayName, bio, profileImageURL);
      await setDoc(userDocRef, {
        displayName,
        bio,
        profileImageURL,
      }, { merge: true });
    //   console.log('Profile saved!');
      if (onSaveComplete) onSaveComplete();
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    //   console.log('Error saving profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelected = (image) => {
    if (image && image.uri) {
      setProfileImageURL(image.uri);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Profile Image</Text>
      <ImagePickerComponent
        currentImage={profileImageURL}
        onImageSelected={handleImageSelected}
        size={80}
      />
      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your display name"
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Enter your bio"
        multiline
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: themeColors.cardBackground,
    borderRadius: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: themeColors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: themeColors.backgroundDark,
    color: themeColors.textPrimary,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginVertical: 12,
    borderWidth: 2,
    borderColor: themeColors.backgroundDark,
  },
  saveButton: {
    backgroundColor: themeColors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: themeColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: themeColors.danger,
    marginTop: 8,
    textAlign: 'center',
  },
  pickerButton: {
    backgroundColor: themeColors.backgroundAlt,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
});
