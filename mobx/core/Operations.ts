import {action, observable} from 'mobx';

import {Operation} from '../../types/core/operation';

export class Operations {
  @observable.deep public operations = new Map<string, Operation>();

  @action public addOrUpdateOperation = (operation: Operation) => {
    this.operations.set(operation.id, operation);
  };

  @action public removeOperation = (id: string) => {
    this.operations.delete(id);
  };
}

export default new Operations();