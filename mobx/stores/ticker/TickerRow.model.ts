import { action, observable, makeObservable } from 'mobx';

import {Quotation} from '../../../api/ticker/quotation.types';

export class TickerRow {
  public name: string;
  @observable public last: string;
  @observable public highestBid: string;
  @observable public percentChange: string;
  constructor({last, highestBid, percentChange}: Quotation, name: string) {
    makeObservable(this);
    this.name = name;
    this.last = last;
    this.highestBid = highestBid;
    this.percentChange = percentChange;
  }

  @action public update({last, highestBid, percentChange}: Quotation) {
    this.last = last;
    this.highestBid = highestBid;
    this.percentChange = percentChange;
  }
}
