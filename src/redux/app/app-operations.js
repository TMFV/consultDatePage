import axios from "axios";
import actions from "./app-actions";

const addDate = (date) => async(dispatch) => {
  try{await dispatch(actions.addDateRequest());
    await dispatch(actions.addDateSuccess(date));}
  catch{await dispatch(actions.addDateError(error=>console.error(error)));}
};

  const addFullDate = (fullDate) => async(dispatch) => {
    try{await dispatch(actions.addFullDateRequest());
      await dispatch(actions.addFullDateSuccess(fullDate));}
    catch{await dispatch(actions.addFullDateError(error=>console.error(error)));}
};

const addTime =  (time) => async(dispatch) => {
  try{await dispatch(actions.addTimeRequest());
    await dispatch(actions.addTimeSuccess(time));}
    catch{await dispatch(actions.addTimeError(error=> console.error(error)));}
  };

export default {addDate, addTime, addFullDate }
