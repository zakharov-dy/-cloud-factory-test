import {observer} from 'mobx-react';

import bindStore from '../../hooks/bindStore/bindStore.hoc';
import { TickerType, ticker } from '../../stores';
import {styles} from './styles';
import TickersScreen, {Props} from './TickersScreen';

const BoundTicker = bindStore<Props, TickerType>(ticker, {
  containerStyle: styles.container
})(observer(TickersScreen));

export default BoundTicker;
