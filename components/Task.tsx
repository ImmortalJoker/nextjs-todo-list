import { FC } from "react";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react";
import { checkmark, trash } from 'ionicons/icons';

import { TTask } from "../types/types";
import useTaskActions from "../hooks/useTaskActions";

interface ITaskProps extends TTask {}

const Task: FC<ITaskProps> = ({ completed, id, title, userId }) => {
  const { finishTask, removeTask } = useTaskActions();

  return (
    <IonCard color={completed ? 'medium' : 'undefined'}>
      <IonCardHeader>
          <IonCardTitle>Id: {id}</IonCardTitle>
          <IonCardSubtitle>User: {userId}</IonCardSubtitle>
      </IonCardHeader>

        <IonCardContent>{title}</IonCardContent>

      <IonButton disabled={completed} color="success" fill='clear' aria-label='Done' onClick={finishTask(id)}>
        <IonIcon slot="icon-only" icon={checkmark} />
      </IonButton>

      <IonButton color="danger" fill='clear' aria-label='Delete' onClick={removeTask(id)}>
        <IonIcon slot="icon-only" icon={trash} />
      </IonButton>
    </IonCard>
  );
};

export default Task;
