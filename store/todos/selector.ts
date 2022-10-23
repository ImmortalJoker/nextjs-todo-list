import { useIonToast } from '@ionic/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from "../store";

const useTodosSelector = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [present] = useIonToast();
  const { tasks, ...rest } = useSelector(({ todos }: RootState) => ({
  ...todos
  }));
  const userIdNum = Number(userId);

  let filteredTasks = tasks;

  if (typeof userId !== "undefined" && Number.isNaN(userIdNum)) {
     present({
      color: 'danger',
      duration: 2500,
      message: `"userId" should be number only, got: ${userId}.`,
      position: 'bottom'
     });
    
    router.replace('/');
  }

  if (typeof userId !== "undefined") {
    filteredTasks = tasks && tasks.filter(task => task.userId === userIdNum)
  }

  return {
    tasks: filteredTasks,
    ...rest,
  };
};

export default useTodosSelector;
