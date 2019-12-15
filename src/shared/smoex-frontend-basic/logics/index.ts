import { combineReducers } from 'redux'
import { accountReducer } from './account/reducers'

export const commonReducer = {
  commonAccount: accountReducer,
}
export { accountReducer }
