import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { filter, search, data } from './slices';
export const store = configureStore({ reducer: { filter, search, data } });

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
