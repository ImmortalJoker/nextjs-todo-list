import { useIonToast } from '@ionic/react';
import { useDispatch } from 'react-redux';

import { completeTask, deleteTask } from "../store/todos/actions";

const useTaskActions = () => {
  const dispatch = useDispatch();
  const [present] = useIonToast();

  const finishTask = (id: number) => () => { 
    dispatch(completeTask(id));

    present({
      color: 'primary',
      duration: 1500,
      message: `Task ${id} marked as completed.`,
      position: 'bottom'
    });
  };

  const removeTask = (id: number) => () => { 
    dispatch(deleteTask(id));

    present({
      color: 'primary',
      duration: 1500,
      message: `Task ${id} successfully deleted.`,
      position: 'bottom'
    });
  };

  return {
    finishTask,
    removeTask,
  };
 };

export default useTaskActions;