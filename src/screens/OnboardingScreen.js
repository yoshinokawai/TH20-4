import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../../assets/images/BackgroundWelcome.jpg')} // Sửa lại path ảnh nền của bạn
      style={styles.background}
    >
      <View style={styles.bottomSection}>
        <Image 
          source={require('../../assets/images/LogoWhite.png')} 
          style={styles.icon} 
        />
        <Text style={styles.title}>Welcome{"\n"}to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('SignIn')} // Chuyển sang màn SignIn khi bấm
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end', // Đẩy các thành phần xuống đáy
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FCFCFC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#53B175',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;