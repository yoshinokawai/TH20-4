import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import storageService from '../services/storageService';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    const userData = { username, email, token: 'dummy-token-' + Date.now() };
    await storageService.saveUser(userData);
    alert('Sign Up Successful!');
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/Logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Afsar Hossen Shuvo"
              placeholderTextColor="#7C7C7C"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="imshuvo97@gmail.com"
              placeholderTextColor="#7C7C7C"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="********"
                placeholderTextColor="#7C7C7C"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={22} 
                  color="#7C7C7C" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.signupButton}
            activeOpacity={0.8}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 47,
    height: 55,
  },
  headerText: {
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  inputContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C7C7C',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
    fontSize: 18,
    color: '#181725',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
  },
  termsContainer: {
    marginBottom: 30,
  },
  termsText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 22,
  },
  linkText: {
    color: '#53B175',
    fontWeight: '600',
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#53B175',
    paddingVertical: 18,
    borderRadius: 19,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#181725',
    fontSize: 14,
    fontWeight: '600',
  },
  loginLink: {
    color: '#53B175',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;