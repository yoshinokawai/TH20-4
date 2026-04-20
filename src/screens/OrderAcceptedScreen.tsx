import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_COLOR = '#53B175';

const OrderAcceptedScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
            <View style={styles.iconBox}>
                <Ionicons name="checkmark-circle" size={100} color={PRIMARY_COLOR} />
            </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Your Order has been{'\n'}accepted</Text>
          <Text style={styles.subtitle}>
            Your items has been placed and is on{'\n'}it’s way to being processed
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  successIconContainer: {
    marginBottom: 40,
  },
  iconBox: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  trackButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  trackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
});

export default OrderAcceptedScreen;
