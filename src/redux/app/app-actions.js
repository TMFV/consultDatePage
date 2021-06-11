import { createAction } from "@reduxjs/toolkit";

const addDateRequest = createAction("date/DateRequest");
const addDateSuccess = createAction("date/DateSuccess");
const addDateError = createAction("date/DateError");

const addFullDateRequest = createAction("fullDate/FullDateRequest");
const addFullDateSuccess = createAction("fullDate/FullDateSuccess");
const addFullDateError = createAction("fullDate/FullDateError");

const addTimeRequest = createAction("timeTimeRequest");
const addTimeSuccess = createAction("time/TimeSuccess");
const addTimeError = createAction("time/TimeError");

export default {
  addDateRequest,
  addDateSuccess,
  addDateError,
  addFullDateRequest,
  addFullDateSuccess,
  addFullDateError,
  addTimeRequest,
  addTimeSuccess,
  addTimeError,

};
