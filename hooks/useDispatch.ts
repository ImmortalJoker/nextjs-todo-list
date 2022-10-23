import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store-rtk/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
