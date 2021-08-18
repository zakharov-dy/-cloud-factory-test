import {action, autorun, computed, IReactionDisposer, observable} from 'mobx';
import {now} from 'mobx-utils';

import tickerAPI from '../../api/ticker/Ticker';
import {GetTickerResponse} from '../../api/ticker/ticker.types';
import {BoundStore} from '../../hooks/bindStore/boundStore.types';
import operation from '../operation/operationDecorathor';
import operationStore from '../operation/Operations';
import {TickerRow} from './TickerRow';

type TickerRowView = Omit<TickerRow, 'update'>;

class Ticker implements BoundStore {
  @observable.shallow private values = observable.map<string, TickerRow>();
  private getTickerCanceller: IReactionDisposer | undefined;

  @action private update(res: GetTickerResponse) {
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
        this.values.set(k, new TickerRow(newRow, k));
      }
    });
  }

  @operation('getTicker') public *getTicker() {
    // Если нужно, чтобы что-то пошло не так
    // const res: GetTickerResponse = yield tickerAPI.getUnstableTicker();
    const res: GetTickerResponse = yield tickerAPI.getTicker();
    this.update(res);
  }

  public startUp() {
    this.getTickerCanceller = autorun(() => {
      now(5000);
      this.getTicker();
    });
  }

  @computed get visible(): TickerRowView[] {
    const res: TickerRowView[] = [];
    this.values.forEach(({update, ...other}: TickerRow) => {
      res.push(other);
    });
    return res;
  }

  @computed get operationHasError(): boolean {
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
