import { Action } from '@ngrx/store';
import { OperatorFunction } from 'rxjs/interfaces';
import { filter } from 'rxjs/operators';

export interface ActionClass<T extends Action> {
  new(...args: any[]): T;
}

export function ofAction<R1 extends Action>(r1: ActionClass<R1>): OperatorFunction<Action, R1>;
export function ofAction<R1 extends Action, R2 extends Action>(r1: ActionClass<R1>, r2: ActionClass<R2>): OperatorFunction<Action, R1 | R2>;
export function ofAction<R1 extends Action, R2 extends Action, R3 extends Action>(r1: ActionClass<R1>, r2: ActionClass<R2>, r3: ActionClass<R3>): OperatorFunction<Action, R1 | R2 | R3>;
export function ofAction<R1 extends Action, R2 extends Action, R3 extends Action, R4 extends Action>(r1: ActionClass<R1>, r2: ActionClass<R2>, r3: ActionClass<R3>, r4: ActionClass<R4>): OperatorFunction<Action, R1 | R2 | R3 | R4>;
export function ofAction<R1 extends Action, R2 extends Action, R3 extends Action, R4 extends Action, R5 extends Action>(r1: ActionClass<R1>, r2: ActionClass<R2>, r3: ActionClass<R3>, r4: ActionClass<R4>, r5: ActionClass<R5>): OperatorFunction<Action, R1 | R2 | R3 | R4 | R5>;
export function ofAction<R1 extends Action, R2 extends Action, R3 extends Action, R4 extends Action, R5 extends Action, R6 extends Action>(r1: ActionClass<R1>, r2: ActionClass<R2>, r3: ActionClass<R3>, r4: ActionClass<R4>, r5: ActionClass<R5>, r6: ActionClass<R6>): OperatorFunction<Action, R1 | R2 | R3 | R4 | R5 | R6>;
export function ofAction<R extends Action>(...allowedClasses: ActionClass<any>[]): OperatorFunction<Action, R> {
  return filter(
    (action: Action): action is R =>
      allowedClasses.some(allowedClass => action instanceof allowedClass)
  );
}
