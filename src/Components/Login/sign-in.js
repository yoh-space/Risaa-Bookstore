import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const slideAnim = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  const toggleForm = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isSignIn ? 1 : 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: isSignIn ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      })
    ]).start();
    
    setIsSignIn(!isSignIn);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width]
  });

  const opacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://placehold.co/100x100/6a11cb/FFFFFF/png?text=Logo' }} 
              style={styles.logo}
            />
            <Text style={styles.appName}>AppName</Text>
            <Text style={styles.tagline}>
              {isSignIn ? 'Welcome back!' : 'Create your account'}
            </Text>
          </View>

          <Animated.View 
            style={[
              styles.formContainer,
              { transform: [{ translateX }] }
            ]}
          >
            <View style={styles.form}>
              {!isSignIn && (
                <Animated.View style={{ opacity }}>
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
                </Animated.View>
              )}

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

              {!isSignIn && (
                <Animated.View style={{ opacity }}>
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
                </Animated.View>
              )}

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signInButton}>
                <LinearGradient
                  colors={['#6a11cb', '#2575fc']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}
                </Text>
                <TouchableOpacity onPress={toggleForm}>
                  <Text style={styles.signUpLink}>
                    {isSignIn ? ' Sign Up' : ' Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
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
  formContainer: {
    width: width * 2,
    flexDirection: 'row',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6a11cb',
    fontSize: 14,
  },
  signInButton: {
    marginBottom: 20,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    width: '48%',
  },
  socialButtonText: {
    marginLeft: 8,
    color: '#333',
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
});