import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../../firebase';

const storage = getStorage(app);

/**
 * Upload profile image to Firebase Storage
 * @param {string} uid - User ID
 * @param {object} image - Image object (from image picker)
 * @param {string} image.uri - Image URI
 * @param {string} image.type - Image MIME type
 * @returns {Promise<string>} Download URL of the uploaded image
 */
export const uploadProfileImage = async (uid, image) => {
  try {
    // Convert image URI to blob
    const response = await fetch(image.uri);
    const blob = await response.blob();
    
    // Create storage reference
    const storageRef = ref(storage, `profile-images/${uid}/${Date.now()}_profile.jpg`);
    
    // Upload the image
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw new Error('Failed to upload profile image');
  }
};

/**
 * Delete profile image from Firebase Storage
 * @param {string} imageUrl - URL of the image to delete
 */
export const deleteProfileImage = async (imageUrl) => {
  try {
    // Extract the path from the URL
    const urlParts = imageUrl.split('/');
    const path = urlParts.slice(urlParts.indexOf('o') + 1).join('/').split('?')[0];
    const decodedPath = decodeURIComponent(path);
    
    const storageRef = ref(storage, decodedPath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting profile image:', error);
    // Don't throw error for deletion failures as it's not critical
  }
};

/**
 * Generate a unique filename for profile images
 * @param {string} uid - User ID
 * @returns {string} Unique filename
 */
export const generateProfileImageName = (uid) => {
  return `profile_${uid}_${Date.now()}.jpg`;
};

/**
 * Check if an image URL is from Firebase Storage
 * @param {string} url - Image URL to check
 * @returns {boolean} True if it's a Firebase Storage URL
 */
export const isFirebaseStorageUrl = (url) => {
  return url && url.includes('firebasestorage.googleapis.com');
};