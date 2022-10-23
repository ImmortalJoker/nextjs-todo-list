import { createSlice, configureStore, Store, ThunkAction, Action, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import { TTaskList } from '../types/types';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const hydrateAction = createAction<any>(HYDRATE);
interface TodoState {
  tasks: TTaskList;
  isLoading: boolean;
  isError?: string;
  lastId: number;
}

// Define the initial state using that type
const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  lastId: 0,
}

export const fetchTodos = createAsyncThunk<
  { tasks: TTaskList }
>('todos/fetchTodos', async () => {
  const response = await fetch(TODOS_URL).then(res => res.json());

  return { tasks: response };
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        completed: false,
        userId: 9,
        id: 1,
        title: action.payload,
      })
    },
    deletE: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(({ id }) => id !== action.payload)
    },
    complete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(({ id }) => id === action.payload);

      if (task) {
        task.completed = true;
      }
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.isError = undefined;
        state.lastId = action.payload.tasks.at(-1)?.id ?? 0;
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
       })
      .addCase(hydrateAction, (state, action) => {
        console.log('HYDRATE', state, action.payload);
        
        return {
          ...state,
          ...action.payload,
        };
      })
});

export const { add, deletE, complete } = todoSlice.actions

const makeStore = () => configureStore({
  reducer: {
    [todoSlice.name]: todoSlice.reducer
  },
  devTools: true
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = AppStore['getState'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
