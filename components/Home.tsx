import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import type { NextPage } from 'next';
import { IonApp, IonContent, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonToast } from '@ionic/react';

import Header from './Header';
import TaskList from './TaskList';
import { loadTodoList } from '../store/todos/actions';
import useTodosSelector from '../store/todos/selector';

const Home: NextPage = () => {
  const [present] = useIonToast();
  const dispatch = useDispatch();
  const { tasks, isLoading, isError } = useTodosSelector();

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    dispatch(loadTodoList())
      .finally(() => {
        event.detail.complete();
      });
  };

  useEffect(() => {
    dispatch(loadTodoList());
  }, [dispatch])

  if (isError) {
    present({
      color: 'danger',
      duration: 1500,
      message: isError,
      position: 'bottom'
    });
  };
  
  return (
    <IonApp>
      <Header loading={isLoading} />

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
        <TaskList tasks={tasks} />
      </IonContent>
   </IonApp>
  )
}

export default Home