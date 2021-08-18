import {observer} from 'mobx-react';

import bindStore from '../../hooks/bindStore/bindStore.hoc';
import {ticker, TickerType} from '../../mobx';
import {styles} from './styles';
import Ticker, {Props} from './Ticker';

const BoundTicker = bindStore<Props, TickerType>(ticker, {
  containerStyle: styles.container
})(observer(Ticker));

// @ts-ignore
BoundTicker.navigationOptions = {
  title: 'Котировки'
};

export default BoundTicker;
