import { ACCOUNT_ACTION, ACCOUNT_ASYNC_ACTION } from './enums'
import { accountAPI } from '../../apis/account'
import { asAccountParams } from './parsers'
import { accountApi } from '../../apis'
import { securityAPI } from '../../apis/security'

const sleep = (timeountMS: any) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeountMS)
  })

function createAction(type: string) {
  return (payload: any) => ({
    type,
    payload,
  })
}

export const accountAction = {
  setInfo: createAction(ACCOUNT_ACTION.SET_INFO),
  // setInfo: (data: any) => ({
  //   type: ACCOUNT_ACTION.SET_INFO,
  //   payload: async () => {
  //     await sleep(1000)
  //     return data
  //   },
  // }),
}

const getInfo = async (meta: any, dispatch: any) => {
  return Promise.all(
    ['type1', 'type2'].map(async (x) => {
      const resp = await accountApi.getInfo(meta)
      if (x === 'type1') {
        throw {}
      }
      dispatch(accountAction.setInfo(resp))
      return resp
    }),
  )
}

export const accountAsyncAction = {
  getInfo: () => ({
    type: ACCOUNT_ASYNC_ACTION.GET_INFO,
    target: accountAPI.getInfo,
    failure: ACCOUNT_ACTION.SET_ERROR,
    success: accountAction.setInfo,
  }),
  login: (account: string, password: string) => ({
    type: ACCOUNT_ASYNC_ACTION.LOGIN,
    meta: { account, password },
    target: accountAPI.login,
    success: accountAction.setInfo,
  }),
  logout: () => ({
    type: ACCOUNT_ASYNC_ACTION.LOGIN,
    target: accountAPI.logout,
    success: accountAction.setInfo,
  }),
  sendCode: (target: string, scene: string) => ({
    type: ACCOUNT_ASYNC_ACTION.SEND_CODE,
    meta: { target, scene },
    target: securityAPI.sendCode,
  }),
  verifyCode: (code: string, scene: string) => ({
    type: ACCOUNT_ASYNC_ACTION.VERIFY_CODE,
    meta: { code, scene },
    target: securityAPI.verifyCode,
    success: accountAction.setInfo,
  }),
}
