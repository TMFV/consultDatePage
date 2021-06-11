import { useEffect, useState } from "react";
import { connect } from "react-redux";
import appOperations from "../../redux/app/app-operations";
import styles from "./DatePicker.module.css";
import {
  getDate,
  getMonth,
  addDays,
  addMonths,
  differenceInMonths,
  format,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
} from "date-fns";
import PropTypes from "prop-types";
import selectors from "../../redux/app/app-selectors";
import listIcon from "../../images/atom/icon/list/Vector.svg";
import calendarIcon from "../../images/atom/icon/calendar/Union.svg";

// Component create inline calendar for pick date - startDay Always-today

function DatePicker({
  addFullDate,
  consultationDate,
  addDate,
  endDate,
  selectDate,
  getSelectedDay,
  color}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Selected Day properties
  const firstSection = { marginLeft: "40px" };
  const startDate = new Date();
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || "#33BDE4";
  const selectedStyle = {
    fontWeight: "bold",
    width: "86px",
    height: "92px",
    borderRadius: "6px",
    border: `1px solid ${primaryColor}`,
    color: primaryColor,
    boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.04)",
    background: "#F0FBFF",
  };

  const getStyles = (day) => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }
    return null;
  };

  const getId = (day) => {
    if (isSameDay(day, selectedDate)) {
      return "selected";
    } else {
      return "";
    }
  };

  // Translate fn days title
  function translateWeek(dayName) {
    switch (dayName) {
      case "Mon":
        return "Пн";
      case "Tue":
        return "Вт";
      case "Wed":
        return "Ср";
      case "Thu":
        return "Чт";
      case "Fri":
        return "Пт";
      case "Sat":
        return "Сб";
      case "Sun":
        return "Вс";
      default:
        return dayName;
    }
  }

  //Translate fn Month
  function translateMonth(N) {
    switch (N) {
      case 1:
        return " Января";
      case 2:
        return "Февраля";
      case 3:
        return "Марта";
      case 4:
        return "Апреля";
      case 5:
        return "Мая";
      case 6:
        return "Июня";
      case 7:
        return "Июля";
      case 8:
        return "Августа";
      case 9:
        return "Сентября";
      case 10:
        return "Октября";
      case 11:
        return "Ноября";
      case 12:
        return "Декабря";
      default:
        return N;
    }
  }

  //Create day list for datePicker
  function renderDays() {
    const dayFormat = "E";
    const dateFormat = "d";
    const months = [];
    let days = [];
    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
      end =
        i === differenceInMonths(lastDate, startDate)
          ? Number(format(lastDate, "d"))
          : Number(format(lastDayOfMonth(month), "d"));
          //j - current day
      for (let j = start; j < end; j++) {
        if (days.length === 0) {
          days.push(
            <div
              id={`${getId(addDays(startDate, j))}`}
              className={styles.dateDayItem}
              style={getStyles(addDays(month, j))}
              key={addDays(month, j)}
              onClick={() => onDateClick(addDays(month, j))}
              value={`${getId(addDays(startDate, j))}`}
            >
              <div className={styles.dayLabel}>
                {"Сегодня"}
              </div>
              <div className={styles.dateLabel}>
                {format(addDays(month, j), dateFormat)}
              </div>
            </div>
          );
        } else {
          days.push(
            <div
              id={`${getId(addDays(startDate, j))}`}
              className={styles.dateDayItem}
              style={getStyles(addDays(month, j))}
              key={addDays(month, j)}
              onClick={() => onDateClick(addDays(month, j))}
              value={`${getId(addDays(startDate, j))}`}
            >
              <div className={styles.dayLabel}>
                {translateWeek(format(addDays(month, j), dayFormat))}
              </div>
              <div className={styles.dateLabel}>
                {format(addDays(month, j), dateFormat)}
              </div>
            </div>
          );
        }
      }//Mounth array
      months.push(
        <div className={styles.monthContainer} key={month}>
          <div
            className={styles.daysContainer}
            style={i === 0 ? firstSection : null}
          >
            {days}
          </div>
        </div>
      );
      days = [];
    }
    return (
      <div id={"container"} className={styles.dateListScrollable}>
        {months}
      </div>
    );
  }

  const onDateClick = (day) => {
    setSelectedDate(day);
    if (getSelectedDay) {
      getSelectedDay(day);
    }
    //get information for redux store
    let monthNum= getMonth(day);
    let monthName=translateMonth(monthNum);
    let dayNumber=getDate(day); 
    //add to store (app>date)
    addDate(`${dayNumber} ${monthName}`);
    addFullDate(day.toString());
  };
  
  useEffect(() => {
    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        getSelectedDay(startDate);
      }
    }
  }, []);

  useEffect(() => {

    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        getSelectedDay(startDate);
      }
    }
  }, []);
  useEffect(() => {
    if (consultationDate==="") {
        addDate(`Сегодня`);
      } else {
        addDate(consultationDate);
      
    }
  }, []);

  return (
    <div className={styles.date__main_container}>
      <div className={styles.date__title_line_text}>
        <span className={styles.date__title_text}>Возможная дата</span>
        <div className={styles.date__title_buttons}>
          <button className={styles.date__toggle_button}>
            <img src={listIcon} alt="icon list"></img>
          </button>
          <button className={styles.date__toggle_button}>
            <img src={calendarIcon} alt="icon list"></img>
          </button>
        </div>
      </div>
      <div className={styles.container}>{renderDays()}</div>
    </div>
  );
}

const mapDispatchToProrps = (dispatch) => ({
  addDate: (date) => dispatch(appOperations.addDate(date)),
  addFullDate: (fullDate) => dispatch(appOperations.addFullDate(fullDate)),
});

const mapStateToProps = (state) => ({
  consultationDate: selectors.getConsultDate(state),
  consultationFullDate: selectors.getConsultFullDate(state),
});

DatePicker.propTypes ={
  addFullDate: PropTypes.func.isRequired,
  consultationDate: PropTypes.string.isRequired,
  addDate: PropTypes.func.isRequired,
  endDate: PropTypes.number.isRequired,
  color: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProrps)(DatePicker);
