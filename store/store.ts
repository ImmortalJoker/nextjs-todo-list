import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Reducer, Store, ThunkAction } from '@reduxjs/toolkit';

import todos from './todos/reducer';
import { TodoListActions } from './todos/actions';

export type ThunkResult<R> = ThunkAction<R, RootState, any, RootAction>
export type RootAction = TodoListActions
export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  todos
});

const masterReducer: Reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      todos: state.todos.counter + action.payload.todos.counter,
    };
  }
  else {
    return combinedReducer(state, action);
  }
}

const initStore = () =>
  createStore(masterReducer, composeWithDevTools(
    applyMiddleware(thunk)
  ));

export const wrapper = createWrapper<Store<RootState, RootAction>>(initStore);