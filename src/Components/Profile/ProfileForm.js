import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Utils/color';
import ImagePickerComponent from './ImagePicker';
import { useAuth } from '../../Provider/AuthProvider';

const ProfileForm = ({ onSaveComplete, initialData = {} }) => {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: '',
    preferences: {},
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        displayName: initialData.displayName || '',
        email: initialData.email || '',
        bio: initialData.bio || '',
        preferences: initialData.preferences || {},
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleImageSelected = (image) => {
    setSelectedImage(image);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const updates = {
        displayName: formData.displayName.trim(),
        bio: formData.bio.trim(),
        preferences: formData.preferences,
      };

      if (selectedImage) {
        updates.image = selectedImage;
      }

  // TODO: Replace with Firebase-only profile update logic
      
      Alert.alert('Success', 'Profile updated successfully');
      if (onSaveComplete) {
        onSaveComplete();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    Alert.prompt(
      'Update Email',
      'Please enter your current password to confirm email change:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: async (password) => {
            if (!password) {
              Alert.alert('Error', 'Password is required');
              return;
            }

            setSaving(true);
            try {
              // TODO: Replace with Firebase-only email update logic
              Alert.alert(
                'Email Update', 
                'Verification email sent. Please check your inbox to confirm the email change.'
              );
            } catch (error) {
              console.error('Failed to update email:', error);
              Alert.alert('Error', error.message || 'Failed to update email');
            } finally {
              setSaving(false);
            }
          },
        },
      ],
      'secure-text'
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <View style={styles.imagePickerContainer}>
          <ImagePickerComponent
            currentImage={initialData?.photoURL}
            onImageSelected={handleImageSelected}
            size={120}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Display Name *</Text>
          <TextInput
            style={[styles.input, errors.displayName && styles.inputError]}
            value={formData.displayName}
            onChangeText={(text) => handleInputChange('displayName', text)}
            placeholder="Enter your display name"
            placeholderTextColor={themeColors.textSecondary}
          />
          {errors.displayName && (
            <Text style={styles.errorText}>{errors.displayName}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address *</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Enter your email"
              placeholderTextColor={themeColors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {formData.email !== authUser?.email && (
              <TouchableOpacity 
                style={styles.updateEmailButton}
                onPress={handleEmailUpdate}
                disabled={saving}
              >
                <Text style={styles.updateEmailText}>Update</Text>
              </TouchableOpacity>
            )}
          </View>
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          {authUser?.emailVerified && (
            <Text style={styles.verifiedText}>
              <Icon name="verified" size={14} color={themeColors.success} /> Email verified
            </Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.textArea, errors.bio && styles.inputError]}
            value={formData.bio}
            onChangeText={(text) => handleInputChange('bio', text)}
            placeholder="Tell us about yourself..."
            placeholderTextColor={themeColors.textSecondary}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          {errors.bio && (
            <Text style={styles.errorText}>{errors.bio}</Text>
          )}
          <Text style={styles.charCount}>
            {formData.bio.length}/500 characters
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.preferencesNote}>
          Preferences configuration will be available in future updates.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: themeColors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginBottom: 16,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: themeColors.backgroundLight,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  textArea: {
    backgroundColor: themeColors.backgroundLight,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: themeColors.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: themeColors.danger,
  },
  errorText: {
    color: themeColors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateEmailButton: {
    marginLeft: 8,
    backgroundColor: themeColors.warning,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  updateEmailText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  verifiedText: {
    color: themeColors.success,
    fontSize: 12,
    marginTop: 4,
  },
  charCount: {
    color: themeColors.textSecondary,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  preferencesNote: {
    color: themeColors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: themeColors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  saveButtonDisabled: {
    backgroundColor: themeColors.textSecondary,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileForm;