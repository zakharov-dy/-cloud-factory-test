import {flow} from 'mobx';

import operations from './Operations';

// Поскольку flow канселится можно добавить и cancel, но тут это не нужно
export const operationRunner = <TArgs extends any[], TRes>(
  id: string,
  genFunc: any
) => {
  const run = (...args: TArgs) => {
    operations.addOrUpdateOperation({
      id,
      isLoading: true,
      isError: false,
      error: null,
      args
    });

    const onSuccess = () => {
      operations.addOrUpdateOperation({
        id,
        isError: false,
        error: null,
        isLoading: false
      });
    };

    const onError = (error: any) => {
      console.log(error);
      operations.addOrUpdateOperation({
        id,
        isError: true,
        error,
        isLoading: false
      });
    };

    return flow(genFunc)(args)
      .then(onSuccess)
      .catch(onError);
  };

  const destroy = () => {
    operations.removeOperation(id);
  };

  return {
    id,
    run,
    destroy
  };
};
