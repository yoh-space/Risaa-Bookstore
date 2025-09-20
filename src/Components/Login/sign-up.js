import React, { useState } from 'react';
import { useAuth } from '../../Provider/AuthProvider';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SystemBars } from 'react-native-edge-to-edge';
import { themeColors } from '../Utils/color';

const { width } = Dimensions.get('window');

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const [isSignIn, setIsSignIn] = useState(false); // To toggle between sign in and sign up views

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      // Pass name to AuthProvider's signup
      await signup(email, password, name);
      navigation.goBack();
      // TODO: Navigate to main app screen after successful sign up
    } catch (err) {
      if (err.message && err.message.includes('auth/invalid-credential')) {
        setError('Unable to create account with these credentials. Please check your email and password and try again.');
      } else {
        setError(err.message || 'Sign up failed');
      }
    }
    setLoading(false);
  };

  return (
    <View style={{flex:1, backgroundColor: themeColors.backgroundDark}}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <LinearGradient
          colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <SystemBars style="light" />
          {/* Back Arrow */}
          <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack() }>
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://placehold.co/100x100/6a11cb/FFFFFF/png?text=Logo' }} 
              style={styles.logo}
            />
            <Text style={styles.appName}>Risaa BookStore</Text>
            <Text style={styles.tagline}>
              {isSignIn ? 'Welcome back!' : 'Create your account'}
            </Text>
          </View>        
        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#6a11cb" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#6a11cb" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6a11cb" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#6a11cb" 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6a11cb" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#6a11cb" 
              />
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{error}</Text>
          ) : null}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
            <LinearGradient
              colors={['#6a11cb', '#2575fc']}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Please wait...' : 'Sign Up'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 4,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  form: {
    width: width - 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  signUpButton: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
