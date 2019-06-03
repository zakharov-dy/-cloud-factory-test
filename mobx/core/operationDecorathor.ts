import {operationRunner} from './operationRunner';

export default function (id: string) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function () {
      return operationRunner(id, method.bind(this)).run(arguments);
    };
  };
}
