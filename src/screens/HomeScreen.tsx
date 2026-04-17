import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PRIMARY_COLOR = '#53B175';

const exclusiveOffers = [
  { id: '1', title: 'Organic Bananas', volume: '7pcs, Priceg', price: '$4.99', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80' },
  { id: '2', title: 'Red Apple', volume: '1kg, Priceg', price: '$4.99', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=400&q=80' },
];

const bestSelling = [
  { id: '3', title: 'Bell Pepper Red', volume: '1kg, Priceg', price: '$4.99', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80' },
  { id: '4', title: 'Ginger', volume: '250gm, Priceg', price: '$4.99', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardVolume}>{item.volume}</Text>
      <View style={styles.cardBottomRow}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Location */}
      <View style={styles.header}>
        <Ionicons name="location-sharp" size={20} color="#4C4F4D" />
        <Text style={styles.locationText}>Dhaka, Banassre</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7C7C7C" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search Store" 
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80' }} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Fresh Vegetables</Text>
          <Text style={styles.bannerSubtitle}>Get Up To 40% OFF</Text>
        </View>
      </View>

      {/* Exclusive Offer */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Exclusive Offer</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={exclusiveOffers}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* Best Selling */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Selling</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={bestSelling}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.horizontalList, { marginBottom: 30 }]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    color: '#4C4F4D',
    fontWeight: '600',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#181725',
  },
  bannerContainer: {
    marginHorizontal: 20,
    height: 115,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 25,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#53B175',
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  seeAllText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  horizontalList: {
    paddingLeft: 20,
  },
  card: {
    width: 173,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
  },
  cardImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 5,
  },
  cardVolume: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 15,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  addButton: {
    backgroundColor: PRIMARY_COLOR,
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
