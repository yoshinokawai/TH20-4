import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FailureModalProps {
  visible: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  onBackToHome: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PRIMARY_COLOR = '#53B175';

const FailureModal: React.FC<FailureModalProps> = ({ visible, onClose, onTryAgain, onBackToHome }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#181725" />
          </TouchableOpacity>

          <Image 
            source={require('../../assets/images/order_failure.png')} 
            style={styles.illustration} 
            resizeMode="contain"
          />

          <Text style={styles.title}>Oops! Order Failed</Text>
          <Text style={styles.subtitle}>Something went terribly wrong.</Text>

          <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
            <Text style={styles.tryAgainText}>Please Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeLink} onPress={onBackToHome}>
            <Text style={styles.homeLinkText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    width: Math.min(SCREEN_WIDTH * 0.85, 350),
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 30,
  },
  tryAgainButton: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    height: 60,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeLink: {
    padding: 10,
  },
  homeLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },
});

export default FailureModal;
