import { action, observable, makeObservable } from 'mobx';

import {Operation} from '../utils/operation/operation.types';

export class Operations {
  @observable.deep public operations = new Map<string, Operation>();

  @action public addOrUpdateOperation = (operation: Operation) => {
    this.operations.set(operation.id, operation);
  };

  @action public removeOperation = (id: string) => {
    this.operations.delete(id);
  };

  constructor() {
    makeObservable(this);
  }
}

export default new Operations();