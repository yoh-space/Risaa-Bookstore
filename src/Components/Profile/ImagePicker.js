import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  Pressable,
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
  const [modalVisible, setModalVisible] = useState(false);

  const handleImage = async (action) => {
    if (disabled || uploading) return;

    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    try {
      let result;
      if (action === 'camera') {
        result = await ImagePicker.launchCamera({ ...options, cameraType: 'front' });
      } else {
        result = await ImagePicker.launchImageLibrary(options);
      }

      if (result?.assets?.length > 0) {
        const selectedImage = result.assets[0];
        setUploading(true);
        onImageSelected(selectedImage);
        setUploading(false);
      }
    } catch (error) {
      console.error(`${action} error:`, error);
      setUploading(false);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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

      {/* Modal for Image Options */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Profile Picture</Text>

            <Pressable style={styles.modalButton} onPress={() => handleImage('camera')}>
              <Icon name="photo-camera" size={20} color={themeColors.primary} />
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </Pressable>

            <Pressable style={styles.modalButton} onPress={() => handleImage('gallery')}>
              <Icon name="photo-library" size={20} color={themeColors.primary} />
              <Text style={styles.modalButtonText}>Choose from Library</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  imageContainer: {
    position: 'relative',
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: themeColors.backgroundDark,
  },
  image: { resizeMode: 'cover' },
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
    backgroundColor: themeColors.backgroundDark,
    borderRadius: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: themeColors.backgroundDark,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: themeColors.textPrimary,
  },
  cancelButton: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: themeColors.border,
  },
});

export default ImagePickerComponent;
