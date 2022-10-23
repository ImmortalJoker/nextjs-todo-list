import { FC, useState } from "react";

import { IonButton, IonButtons, IonHeader, IonIcon, IonProgressBar, IonTitle, IonToolbar } from "@ionic/react";
import { add } from 'ionicons/icons';

import AddTask from "./AddTask";

interface IHeaderProps {
  loading?: boolean;
}

const Header: FC<IHeaderProps> = ({ loading = false }) => {
  const [expanded, setExpand] = useState<boolean>(false);

  const handleInputExpand = () => { 
    setExpand(prev => !prev);
  }
  
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton color="primary" onClick={handleInputExpand}>
            <IonIcon slot="icon-only" icon={add}></IonIcon>
          </IonButton>
        </IonButtons>

        <IonTitle>{"Todo's list"}</IonTitle>

        {loading && <IonProgressBar type="indeterminate" />}
      </IonToolbar>

      {expanded && <IonToolbar>
        <AddTask />
      </IonToolbar>}
    </IonHeader>
  )
};

export default Header;
