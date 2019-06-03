import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default ({error}: { error: string }) => (
  <View style={styles.container}>
    <Text style={styles.msg}>{error}</Text>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  msg: {
    fontSize: 26,
    color: '#FFFFFF'
  }
});
