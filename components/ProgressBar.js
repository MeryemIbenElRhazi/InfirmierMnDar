// ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ step, steps }) => {
  const progress = (step / steps) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Étape {step}/{steps}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#1abc9c',
  },
});

export default ProgressBar;
