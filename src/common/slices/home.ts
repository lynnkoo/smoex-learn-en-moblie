import { accountReducer } from 'smoex-common-business'
import { Loading } from 'smoex-mobile-basic'
import { useScopedSelector, useScopedAction, injectReducers, createSlice } from 'redux-async-kit'

const SLICE_NAME = 'home'

const reducers = {
  account: accountReducer,
  account2: accountReducer,
}

export const homeSlice = createSlice(SLICE_NAME, reducers)

// export function injectHomeReducers() {
//   injectReducers(SLICE_NAME, reducers)
// }

// export function useHomeAction(action: any, deps?: any) {
//   return useScopedAction(SLICE_NAME, action, deps)
// }

// export function useHomeSelector(selector: any) {
//   return useScopedSelector(SLICE_NAME, selector)
// }

// export const selectHomeAccount = (state: any) => state.home.account
