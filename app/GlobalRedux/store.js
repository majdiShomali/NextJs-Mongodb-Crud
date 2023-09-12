'use client';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import thunkMiddleware from 'redux-thunk';
import fetchTopicsItemsReducer from "./actions/getTopics"
import fetchTopicsServerItemsReducer from "./actions/getTopicsServer"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        topics:fetchTopicsItemsReducer,
        topicsServer:fetchTopicsServerItemsReducer
    },
    middleware: [thunkMiddleware],
});

export const RootState = typeof store.getState;
export const AppDispatch = typeof store.dispatch;
