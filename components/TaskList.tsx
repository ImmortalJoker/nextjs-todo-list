import { FC } from "react";

import { IonList } from "@ionic/react";

import { TTaskList } from "../types/types";
import Task from "./Task";

interface ITaskProps {
  tasks?: TTaskList
}

const TaskList: FC<ITaskProps> = ({ tasks }) => (
  <IonList>
    {tasks && tasks.map(({ userId, id, title, completed }) =>
      <Task key={id} id={id} userId={userId} title={title} completed={completed} />
    )}

    {!tasks && <div>No tasks yet! Go and create one.</div>}
  </IonList>
);

export default TaskList;
