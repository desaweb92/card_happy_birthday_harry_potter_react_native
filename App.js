import React from 'react';
import { StyleSheet, View } from 'react-native';
import BirthdayCard from './components/BirthdayCard';

export default function App() {
  return (
    <View style={styles.container}>
      <BirthdayCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
