import { useIonToast } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { complete, deletE } from '../store-rtk/store';

import { completeTask, deleteTask } from "../store/todos/actions";
import { useAppDispatch } from './useDispatch';

const useTaskActions = () => {
  const dispatch = useDispatch();
  const AppDispatch = useAppDispatch();
  const [present] = useIonToast();

  const finishTask = (id: number) => () => { 
    // dispatch(completeTask(id));
    AppDispatch(complete(id));

    present({
      color: 'primary',
      duration: 1500,
      message: `Task ${id} marked as completed.`,
      position: 'bottom'
    });
  };

  const removeTask = (id: number) => () => { 
    // dispatch(deleteTask(id));
    AppDispatch(deletE(id));

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