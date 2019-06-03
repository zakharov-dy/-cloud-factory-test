import {Quotation} from '../entities/quotation';

export interface GetTickerResponse {
  [name: string]: Quotation;
}