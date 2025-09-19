import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Utils/color';

const ImagePickerComponent = ({ 
  currentImage, 
  onImageSelected, 
  size = 120,
  disabled = false 
}) => {
  const [uploading, setUploading] = useState(false);

  const selectImage = async () => {
    if (disabled || uploading) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      
      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', 'Failed to select image');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setUploading(true);
        onImageSelected(selectedImage);
        setUploading(false);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
      setUploading(false);
    }
  };

  const takePhoto = async () => {
    if (disabled || uploading) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
      cameraType: 'front',
    };

    try {
      const result = await ImagePicker.launchCamera(options);
      
      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', 'Failed to take photo');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setUploading(true);
        onImageSelected(selectedImage);
        setUploading(false);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
      setUploading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: takePhoto,
        },
        {
          text: 'Choose from Library',
          onPress: selectImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showImageOptions}
        disabled={disabled || uploading}
        style={[styles.imageContainer, { width: size, height: size }]}
      >
        {uploading ? (
          <View style={[styles.loadingContainer, { width: size, height: size }]}>
            <ActivityIndicator size="large" color={themeColors.primary} />
          </View>
        ) : (
          <>
            <Image
              source={{ uri: currentImage || 'https://i.pravatar.cc/150?img=12' }}
              style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            />
            <View style={styles.editOverlay}>
              <Icon name="edit" size={20} color="white" />
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: themeColors.backgroundLight,
  },
  image: {
    resizeMode: 'cover',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: themeColors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 60,
  },
});

export default ImagePickerComponent;