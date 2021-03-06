import { Action } from '@ngrx/store';
import { from } from 'rxjs/observable/from';
import { ofAction } from './of-action';
import { finalize } from 'rxjs/operators';

class NoPayloadAction implements Action {
  readonly type = 'no payload action';
}

class FooAction implements Action {
  readonly type = 'foo action';

  constructor(public payload: string) {
  }
}

class BarAction implements Action {
  readonly type = 'bar action';

  constructor(public payload: string) {
  }
}

describe('ofAction', () => {

  let spy: jasmine.Spy;

  beforeEach(() => {
    spy = jasmine.createSpy('spy');
  });

  it('should pass action', done => {
    const action = new NoPayloadAction();
    from([action]).pipe(
      ofAction(NoPayloadAction),
      finalize(() => {
        expect(spy).toHaveBeenCalledWith(action);
        done();
      })
    ).subscribe(spy);
  });

  it('should block action', done => {
    const action = new NoPayloadAction();
    from([action]).pipe(
      ofAction(FooAction),
      finalize(() => {
        expect(spy).not.toHaveBeenCalled();
        done();
      })
    ).subscribe(spy);
  });

  it('should pass actions', done => {
    const action1 = new NoPayloadAction();
    const action2 = new FooAction('foo');
    const action3 = new BarAction('bar');
    from([action1, action2, action3]).pipe(
      ofAction(NoPayloadAction, FooAction),
      finalize(() => {
        expect(spy).toHaveBeenCalledWith(action1);
        expect(spy).toHaveBeenCalledWith(action2);
        expect(spy).not.toHaveBeenCalledWith(action3);
        done();
      })
    ).subscribe(spy);
  });

  it('should allow to access payload', done => {
    const action1 = new FooAction('foo');
    const action2 = new NoPayloadAction();
    let payload: string;
    from([action1, action2]).pipe(
      ofAction(FooAction, BarAction),
      finalize(() => {
        expect(payload).toBe('foo');
        done();
      })
    ).subscribe(action => payload = action.payload);
  });
});