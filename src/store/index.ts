import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual
} from 'react-redux'

import recommendSlice from '../views/discover/c-views/recommend/store/recommend'

const store = configureStore({
  reducer: {
    recommend: recommendSlice
  }
})

type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
// 可以封装在此，减少导入
export const shallowEqualApp = shallowEqual

export default store
