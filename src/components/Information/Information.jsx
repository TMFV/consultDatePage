import {
    IonGrid,
    IonCol,
    IonRow,
    IonButton
  } from "@ionic/react";
  import PropTypes from "prop-types";
  import { connect } from "react-redux";
  import appOperations from "../../redux/app/app-operations";
  import fb from "../../firebase/fb";
  import selectors from "../../redux/app/app-selectors";
  import styles from "./Information.module.css";

// Component for display and submit consultation date

  const Information = ({consultationDate, 
    consultationTime, 
    consultationFullDate, 
    addDate, 
    addTime}) => {
    fb.getUserCollection('id', 
    addTime,
    addDate,
    consultationDate,
    consultationTime);
    return (
      <>
        <IonGrid className={`${[styles.information__grid]}`}>
          <IonRow className={`${[styles.information__row]}`}>
            <IonCol
              className={`${[styles.information__column]} ion-align-self-center`}
            >
              <div>
                <span className={styles. information__text}>
                  Дата
                </span>
                <span className={styles.information__time}>{`${consultationDate}`}</span>
              </div>
            </IonCol>
            <div className={styles.information__line}></div>
            <IonCol
              className={`${[styles.consultant__column]} ion-align-self-center`}
            >
              <div>
                <span className={styles. information__text}>
                  Время
                </span>
                <span className={styles.information__time}>{`${consultationTime}`}</span>
              </div>
            </IonCol>
          </IonRow>
          <IonButton onClick={()=>fb.addToUserCollection(consultationDate, consultationTime,consultationFullDate)} className={styles.information__button} color="secondary"  expand="block"><span className={styles.information__button_text}>ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ</span></IonButton>
        </IonGrid>
      </>
    );
  };

  const mapStateToProps = (state) => ({
    consultationDate: selectors.getConsultDate(state),
    consultationTime: selectors.getConsultTime(state),
    consultationFullDate: selectors.getConsultFullDate(state),
  });

  const mapDispatchToProrps = (dispatch) => ({
    addDate: (date) => dispatch(appOperations.addDate(date)),
    addTime: (time) => dispatch(appOperations.addTime(time)),
  });
  
Information.propTypes={
  consultationDate: PropTypes.string.isRequired, 
    consultationTime: PropTypes.string.isRequired,  
    consultationFullDate: PropTypes.string.isRequired, 
    addDate: PropTypes.func.isRequired,  
    addTime: PropTypes.func.isRequired
   }
  export default connect(mapStateToProps, mapDispatchToProrps)(Information);
  