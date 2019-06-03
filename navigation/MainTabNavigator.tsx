import React from 'react';
import {Platform} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Ticker from '../screens/ticker';

const HomeStack = createStackNavigator({
  HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'О приложении',
  tabBarIcon: ({focused}: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const TickerStack = createStackNavigator({
  Ticker
});

TickerStack.navigationOptions = {
  tabBarLabel: 'Котировки',
  tabBarIcon: ({focused}: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  TickerStack
});
