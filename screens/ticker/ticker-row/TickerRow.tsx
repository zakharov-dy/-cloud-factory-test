import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

export interface TickerRowProps {
  percentChange?: string;
  last?: string;
  name: string;
  highestBid?: string;
}

export default ({percentChange, last, name, highestBid}: TickerRowProps) => (
  <View style={styles.container}>
    <View style={styles.keyView}>
      <Text style={styles.name}>{name}</Text>
    </View>
    <View style={styles.valueView}>
      <Text>highestBid: {highestBid}</Text>
      <Text>last: {last}</Text>
      <Text>percentChange: {percentChange}</Text>
    </View>
  </View>
);
