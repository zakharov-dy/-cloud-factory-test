import { action, observable, makeObservable } from 'mobx';

import {Operation} from '../utils/operation/operation.types';

export class Operations {
  public operations = new Map<string, Operation>();

  public addOrUpdateOperation = (operation: Operation) => {
    console.log(operation);
    this.operations.set(operation.id, operation);
  };

  public removeOperation = (id: string) => {
    this.operations.delete(id);
  };

  constructor() {
    makeObservable(this, {
      operations: observable.deep,
      addOrUpdateOperation: action,
      removeOperation: action
    });
  }
}

export default new Operations();