import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./app-actions";
import operations from "./app-operations";

const date = createReducer("", {
  [actions.addDateSuccess]: (_, { payload }) => payload,
  [operations.addDate]: ( { payload }) => payload
});
const fullDate = createReducer("", {
  [actions.addFullDateSuccess]: (_, { payload }) => payload,
  [operations.addFullDate]: ({ payload }) => payload
});
const time = createReducer("", {
    [actions.addTimeSuccess]: (_, { payload }) => payload,
    [operations.addTime]: ({ payload }) => payload
  });

export default combineReducers({ date, time, fullDate });
