# ngrx-action-operators

RxJS operators for class-based ngrx actions.

This library provides `ofAction` operator which enables you to:

### Avoid mistakes

No need to specify same type two times. Instead of:

```ts
ofType<pizzaActions.UpdatePizzaSuccess | pizzaActions.RemovePizzaSuccess>(
  pizzaActions.UPDATE_PIZZA_SUCCESS,
  pizzaActions.REMOVE_PIZZA_SUCCESS,
)
```

You can simply write:

```ts
ofAction(
  pizzaActions.UpdatePizzaSuccess,
  pizzaActions.RemovePizzaSuccess,
)
```

And your filtered action will still be of the very same union type!
 
### Reduce boilerplate

You can finally inline all of your action types! You don't need to maintain and export a union of all of your actions, too! Instead of:

```ts
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export type PizzasAction =
  | LoadPizzas
  | LoadPizzasFail
  | LoadPizzasSuccess;
```

You can simply write:

```ts
export class LoadPizzas implements Action {
  readonly type = '[Products] Load Pizzas';
}

export class LoadPizzasFail implements Action {
  readonly type = '[Products] Load Pizzas Fail';
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = '[Products] Load Pizzas Success';
  constructor(public payload: Pizza[]) {}
}
```

Since you no longer need those! Just use `if (action instanceof FooAction)` instead of `switch` statement in your reducers.

## Installation

Install ngrx-action-operators from npm:

`npm install ngrx-action-operators` or `yarn add ngrx-action-operators`