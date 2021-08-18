import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {BoundStore} from './boundStore.types';

interface Options {
  containerStyle?: StyleProp<ViewStyle>;
}

interface Options {
  containerStyle?: StyleProp<ViewStyle>;
}

export default function bindStore<P, T extends BoundStore>(boundStore: T, options: Options) {
  return function (Component: React.ComponentType<P & { boundStore: T }>) {
    return function BindStore(props: P) {
      const isFocused = useIsFocused();
      useEffect(() => {
        if(!isFocused && boundStore.toFinish){
          boundStore.toFinish();
          return;
        }

        if(isFocused && boundStore.startUp){
          boundStore.startUp();
          return;
        }
      }, [isFocused]);

      const containerStyle = options && options.containerStyle;
      return (
        <View style={containerStyle}>
          <Component {...props} boundStore={boundStore} />
        </View>
      );
    };
  };
}
