import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import appOperations from "../../redux/app/app-operations";
import selectors from "../../redux/app/app-selectors";
import styles from "./TimePicker.module.css";
import fb from "../../firebase/fb";

function TimePicker({color,
  timeStart,
  timeEnd, 
  consultationTime, 
  addTime}) {
  
  const [selectedTime, setSelectedTime] = useState('9:30');
  
  //Selected element properties

  const firstSection = { marginLeft: "40px" };
  const primaryColor = color || "#33BDE4";
  const selectedStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    lineHeight: "40px",
    width: "87px",
    height: "40px",
    color: primaryColor,
  };

  const onTimeClick = (curTime) => {
    if (selectedTime !== curTime ) {
      setSelectedTime(curTime); 
    }
    addTime(curTime);
  };

  useEffect(() => {
    fb.getUserTime('id',setSelectedTime);
    if (consultationTime==="") {
        addTime(consultationTime);
      } else {
        setSelectedTime(consultationTime)
        addTime(consultationTime);
    }
  }, []);

// Add to selected item styles

function getStyles(time) {
  if(time == selectedTime){
    return selectedStyle
  }else{return null}

}

// return markup for render Hourse list

  function renderTime(){
    let times = [];
    for (let i = timeStart; i <= timeEnd; i+=1){
      times.push(`${i}:00`)
      times.push(`${i}:30`)
    }
    const markup = timesMarkup(times)
    return markup
  }
  //Create in component markup for hours list
  function timesMarkup(times){
    const mark = times.map((time,idx)=>{
    return <div
      id={`${time}`}
      className={styles.time__item} 
      key={`time${idx}`} 
      style={getStyles(time)}
      onClick={()=>{onTimeClick(time);}} 
      value={`${time}`}>
        {time}
    </div>})

    return (<div id={"container"} className={styles.time__ListScrollable}>
        {mark}
      </div>)
  }

  return (
    <div className={styles.date__main_container}>
      <div className={styles.date__title_line_text}>
        <span className={styles.date__title_text}>Свободное время</span>
      </div>
      <div className={styles.container}>{renderTime()}</div>
    </div>
  );
}

const mapDispatchToProrps = (dispatch) => ({
  addTime: (time) => dispatch(appOperations.addTime(time)),
});
const mapStateToProps = (state) => ({
  consultationTime: selectors.getConsultTime(state),
});

TimePicker.propTypes ={
  color: PropTypes.string,
  consultationTime: PropTypes.string.isRequired, 
  addTime: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProrps)(TimePicker);