import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '../store-rtk/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
