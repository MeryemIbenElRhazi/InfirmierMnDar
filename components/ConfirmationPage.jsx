import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../constants'; // Ensure this path is correct

const ConfirmationPage = ({ onConfirm }) => {
  return (
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationContent}>
        <Image source={images.merci} resizeMode="contain" style={styles.image} />
        <Text style={styles.confirmationText}>Merci pour votre temps</Text>
        <Text style={styles.confirmationSubText}>Nous allons vous contacter pour confirmer votre candidature </Text>
       
        <TouchableOpacity style={styles.button} onPress={onConfirm}>
          <Text style={styles.buttonText}>Terminé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 130,
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmationSubText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  stars: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 24,
    color: '#FFD700',
  },
  starGrey: {
    fontSize: 24,
    color: '#ccc',
  },
  button: {
    backgroundColor: '#00bfa5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationPage;
