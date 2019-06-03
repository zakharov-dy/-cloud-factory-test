import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import {BoundStore} from '../types/core/boundStore';

interface Options {
  containerStyle?: StyleProp<ViewStyle>;
}

function bindStore<P, T extends BoundStore>(boundStore: T, options: Options) {
  return function (Component: React.ComponentType<P & { boundStore: T }>) {
    class BindStore extends React.Component<P> {
      private onWillBlur = () => boundStore.toFinish();
      private onWillFocus = () => boundStore.startUp();

      public render() {
        const {containerStyle} = options;
        return (
          <View style={containerStyle}>
            <NavigationEvents
              onWillBlur={this.onWillBlur}
              onWillFocus={this.onWillFocus}
            />
            <Component {...this.props} boundStore={boundStore} />
          </View>
        );
      }
    }

    return BindStore;
  };
}

export default bindStore;
