import {Quotation} from './quotation.types';

export interface GetTickerResponse {
  [name: string]: Quotation;
}