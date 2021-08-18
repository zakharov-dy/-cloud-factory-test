import {
  action,
  autorun,
  computed,
  IReactionDisposer,
  observable,
  makeObservable,
  runInAction,
} from 'mobx';
import {now} from 'mobx-utils';

import tickerAPI from '../../../api/ticker/Ticker';
import {GetTickerResponse} from '../../../api/ticker/ticker.types';
import {BoundStore} from '../../../hooks/bindStore/boundStore.types';
import { operationRunner } from '../../utils/operation/operationRunner';
import operationStore from '../Operations.store';
import {TickerRow} from './TickerRow.model';

type TickerRowView = Omit<TickerRow, 'update'>;

class Ticker implements BoundStore {
  private values = observable.map<string, TickerRow>();
  private getTickerCanceller: IReactionDisposer | undefined;

  constructor() {
    makeObservable<Ticker, "values" | "update">(this, {
      values: observable.shallow,
      update: action,
      visible: computed,
      operationHasError: computed
    });
  }

  private update(res: GetTickerResponse) {
    this.values.forEach((value: TickerRow, k: string) => {
      if (!res[k]) {
        this.values.delete(k);
      }
    });
    
    Object.keys(res).forEach((k: string) => {
      const oldRow = this.values.get(k);
      const newRow = res[k];

      if (oldRow) {
        oldRow.update(newRow);
      } else {
        console.log(this.values);
        runInAction(() => this.values.set(k, new TickerRow(newRow, k)));
      }
    });
  }

  private *_getTicker() {
    // Если нужно, чтобы что-то пошло не так
    // const res: GetTickerResponse = yield tickerAPI.getUnstableTicker();
    const res: GetTickerResponse = yield tickerAPI.getTicker();
    this.update(res);
  }

  public getTicker = operationRunner('getTicker', this._getTicker.bind(this)).run

  public startUp() {
    this.getTickerCanceller = autorun(() => {
      now(5000);
      this.getTicker();
    });
  }

  get visible(): TickerRowView[] {
    const res: TickerRowView[] = [];
    this.values.forEach(({update, ...other}: TickerRow) => {
      res.push(other);
    });
    return res;
  }

  get operationHasError(): boolean {
    const operation = operationStore.operations.get('getTicker');
    return Boolean(operation && operation.isError);
  }

  public toFinish() {
    if (this.getTickerCanceller) {
      this.getTickerCanceller();
    }
  }
}

export default new Ticker();
