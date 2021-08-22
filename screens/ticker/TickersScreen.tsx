import React from 'react';
import {FlatList} from 'react-native';

import Error from '../../components/Error';
import { TickerType } from '../../stores';
import TickerRow, {TickerRowProps} from './ticker-row/TickerRow';

export interface Props {
  boundStore: TickerType;
}

export default class TickersScreen extends React.Component<Props> {
  private renderItem = ({item}: { item: TickerRowProps }) => (
    <TickerRow {...item} />
  );

  private keyExtractor = (item: TickerRowProps) => item.name;

  public render() {
    return (
      <>
        {this.props.boundStore.operationHasError && (
          <Error error={'¯\\_(ツ)_/¯ что-то пошло не так'} />
        )}
        <FlatList
          data={this.props.boundStore.visible}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </>
    );
  }
}
