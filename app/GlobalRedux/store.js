'use client';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import thunkMiddleware from 'redux-thunk';
import fetchTopicsItemsReducer from "./actions/getTopics"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        topics:fetchTopicsItemsReducer
    },
    middleware: [thunkMiddleware],
});

export const RootState = typeof store.getState;
export const AppDispatch = typeof store.dispatch;
