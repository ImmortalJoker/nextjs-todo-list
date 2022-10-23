import { Reducer } from '@reduxjs/toolkit';

import { TTask, TTaskList } from '../../types/types';
import { todoActionTypes, TodoListActions } from './actions';

export interface TodoListState {
  tasks: TTaskList;
  isLoading: boolean;
  isError?: string;
  lastId: number;
}

const todosInitialState: TodoListState = {
  tasks: [],
  isLoading: false,
  lastId: 0,
};

const reducer: Reducer<TodoListState, TodoListActions> = (state = todosInitialState, action) => {
  switch (action.type) {
    case todoActionTypes.LOAD:
      return { ...state, isLoading: true, isError: undefined };
    case todoActionTypes.LOAD_SUCCESS:
      return { ...state, tasks: action.tasks, isLoading: false, isError: undefined, lastId: action.tasks.at(-1)?.id ?? 0 };
    case todoActionTypes.LOAD_FAILURE:
      return { ...state, isLoading: false, isError: action.error };
    case todoActionTypes.ADD: {
      const newTask: TTask = {
        title: action.task,
        id: ++state.lastId,
        userId: 9,
        completed: false,
      };
      const tasks = [...state.tasks, newTask];
      
      return { ...state, tasks };
    }
    case todoActionTypes.DELETE: {
      const tasks = state.tasks.filter(({ id }) => id !== action.id);

      return { ...state, tasks };
    }
    case todoActionTypes.COMPLETE: {
      const task = state.tasks.find(({ id }) => id === action.id);

      if (task) {
        task.completed = true;
      }

      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
