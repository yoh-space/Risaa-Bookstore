import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

export default function Share() {
  return (
    <View style={styles.container}>
      <SystemBars style='auto'/>
      <Text style={styles.title}>Share</Text>
      <Text>Share this app with your friends!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
});
