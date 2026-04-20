import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import storageService from '../services/storageService';

const PRIMARY_COLOR = '#53B175';

export default function AccountScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await storageService.getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
        await storageService.removeUser();
        navigation.replace('SignIn');
      }
      return;
    }

    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            await storageService.removeUser();
            navigation.replace('SignIn');
          }
        }
      ]
    );
  };

  const AccountItem = ({ icon, title, onPress, color = "#181725" }: any) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={[styles.itemText, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#181725" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=' + (user?.email || 'default') }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
                <Text style={styles.userName}>{user?.username || 'Amasking'}</Text>
                <MaterialCommunityIcons name="pencil-outline" size={20} color={PRIMARY_COLOR} />
            </View>
            <Text style={styles.userEmail}>{user?.email || 'imshuvo97@gmail.com'}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <AccountItem icon="receipt-outline" title="Orders" onPress={() => navigation.navigate('Orders')} />
          <AccountItem icon="card-outline" title="My Details" onPress={() => {}} />
          <AccountItem icon="location-outline" title="Delivery Address" onPress={() => {}} />
          <AccountItem icon="wallet-outline" title="Payment Methods" onPress={() => {}} />
          <AccountItem icon="ticket-outline" title="Promo Cord" onPress={() => {}} />
          <AccountItem icon="notifications-outline" title="Notifications" onPress={() => {}} />
          <AccountItem icon="help-circle-outline" title="Help" onPress={() => {}} />
          <AccountItem icon="information-circle-outline" title="About" onPress={() => {}} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={PRIMARY_COLOR} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 27,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 2,
  },
  menuSection: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F2',
    margin: 25,
    paddingVertical: 18,
    borderRadius: 19,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
});
