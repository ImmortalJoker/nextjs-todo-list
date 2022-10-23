export interface TTask { 
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}

export type TTaskList = TTask[];