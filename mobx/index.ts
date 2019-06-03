import {configure} from 'mobx';

import operations from './core/Operations';
import ticker from './ticker/Ticker';

configure({
  enforceActions: 'observed'
});

const store = {operations, ticker};
export default store;

export {operations, ticker};

export type OperationsType = typeof operations;
export type TickerType = typeof ticker;
export type StoreType = typeof store;
