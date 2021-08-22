
import {configure} from 'mobx';

import operations from './Operations.store';
import ticker from './ticker/Ticker.store';

configure({
  enforceActions: 'observed'
});

const store = {operations, ticker};
export default store;

export {operations, ticker};

export type OperationsType = typeof operations;
export type TickerType = typeof ticker;
export type StoreType = typeof store;