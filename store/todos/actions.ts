import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { TTaskList } from "../../types/types";
import { ThunkResult } from "../store";

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export const enum todoActionTypes {
  LOAD = "TODO_LIST_LOAD",
  LOAD_SUCCESS = "TODO_LIST_LOAD_SUCCESS",
  LOAD_FAILURE = "TODO_LIST_LOAD_FAILURE",
  ADD = "TODO_LIST_ADD",
  DELETE = "TODO_LIST_DELETE",
  COMPLETE = "TODO_LIST_COMPLETE",
};

export type TodoListActions =
  | { type: todoActionTypes.LOAD }
  | { type: todoActionTypes.LOAD_SUCCESS, tasks: TTaskList }
  | { type: todoActionTypes.LOAD_FAILURE, error: string }
  | { type: todoActionTypes.ADD, task: string }
  | { type: todoActionTypes.DELETE, id: number }
  | { type: todoActionTypes.COMPLETE, id: number };

export const loadTodoList = (): AnyAction =>
  //@ts-ignore
  async (dispatch: Dispatch<TodoListActions>) => { 
  try {
    dispatch({ type: todoActionTypes.LOAD });
    const response = await fetch(TODOS_URL).then(res => res.json());

    return dispatch({ type: todoActionTypes.LOAD_SUCCESS, tasks: response});
  } catch (error: any) {
    return dispatch({ type: todoActionTypes.LOAD_FAILURE, error })
  }
};

export const addTask = (message: string) => ({ type: todoActionTypes.ADD, task: message });

export const deleteTask = (id: number) => ({ type: todoActionTypes.DELETE, id });

export const completeTask = (id: number) => ({ type: todoActionTypes.COMPLETE, id });
