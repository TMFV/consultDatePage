import {
  IonImg,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import image from "../../images/man.png";
import image15x from "../../images/man1_5x.png";
import image2x from "../../images/man@2x.png";
import image3x from "../../images/man3x.png";
import styles from "./Consultant.module.css";

//Component create Consultant block (Name,Photo,Duration of consultation)

const Consultant = () => {
  return (
    <>
      <IonLabel className={styles.consultant__name}>
        <span>Алексей Карачинский</span>
      </IonLabel>
      <IonGrid>
        <IonRow>
          <IonCol
            className={`${[styles.consultant__column]} ion-align-self-end`}
          >
            <IonImg
              className={styles.consultant__avatar}
              src={image}
              srcset={`${image15x} 1.5x,${image2x} 2x,${image3x} 3x`}
              alt="man"
            />
          </IonCol>
          <IonCol
            className={`${[styles.consultant__column]} ion-align-self-start`}
          >
            <div>
              <span className={styles.consultant__text}>
                Длительность консультации
              </span>
              <span className={styles.consultant__time}>50 минут</span>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Consultant;
