import { FC, useEffect, useRef, useState } from "react";

import { useDispatch } from 'react-redux';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, useIonToast } from "@ionic/react";
import { arrowForwardOutline } from 'ionicons/icons';

import { addTask } from "../store/todos/actions";

const AddTask: FC<{}> = () => {
  const dispatch = useDispatch();
  const [present] = useIonToast();
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    setValue(value);
  };

  const handleSubmit = () => {
    dispatch(addTask(value));

    setValue('');

    present({
      color: 'primary',
      duration: 1500,
      message: 'Task successfully created',
      position: 'bottom'
    });
  };

  useEffect(()=>{
     setTimeout(() => inputRef.current?.setFocus(), 100);
  },[])

  return (
    <IonItem>
      <IonLabel position="floating">Enter task here</IonLabel>

      <IonInput
        enterkeyhint="send"
        inputmode="text"
        placeholder="Enter text"
        required
        ref={inputRef}
        value={value}
        onIonChange={handleChange}
      />
      
      <IonButton slot="end" fill="clear" aria-label="submit" onClick={handleSubmit}>
        <IonIcon slot="icon-only" icon={arrowForwardOutline} />
      </IonButton>
    </IonItem>
  );
};

export default AddTask;
