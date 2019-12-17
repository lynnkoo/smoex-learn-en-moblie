import * as React from 'react'
import { FullScreenModal } from '../components/FullScreenModal'
import styles from './styles/LoginModal.module.scss'
import { asModalProps, useToggleToast, useToastError } from 'shared/react-dom-basic-kit'
import { useFormState } from 'shared/react-dom-basic-kit/components/Form'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { enhanceFormComponent } from 'shared/react-dom-basic-kit/components/Form'
import { useActionCallback } from 'shared/redux-async-kit'
import { accountAsyncAction } from 'shared/smoex-frontend-basic/logics/account/actions'
import { LoginFormInput } from '././LoginModal'
import { commonSlice } from 'shared/smoex-frontend-basic'

const cx = transformStyles(styles)

const TLoginForm: React.FC<any> = (props) => {
  const { toRegister, callback } = props
  const [data, setData] = useFormState()
  const [loginType, setLoginType] = React.useState('password')

  const [login, LoginLoading] = commonSlice.useAction(accountAsyncAction.login)
  const [sendCode, sendLoading] = commonSlice.useAction(accountAsyncAction.sendCode)
  const [verify, verifyLoading] = commonSlice.useAction(accountAsyncAction.verifyCode)
  const loading = LoginLoading || sendLoading

  const [onLogin, loginError] = useActionCallback(async () => {
    const { account, password, code } = data
    if (loginType === 'password') {
      await login(account, password)
    } else if (loginType === 'code') {
      await verify(code, 'login')
    }
    if (callback) {
      callback()
    }
  }, [login, data, loginType, verify])

  const [onSendCode, sendCodeError] = useActionCallback(async () => {
    const { account } = data
    await sendCode(account, 'login')
  }, [sendCode, data])

  useToastError(loginError)
  useToastError(sendCodeError)

  React.useEffect(() => {
    setData({ password: '', code: '' })
  }, [loginType])

  const onChangeType = () => {
    setLoginType((x) => (x === 'password' ? 'code' : 'password'))
  }

  return (
    <form className={cx('login-form')}>
      <div className={cx('login-label')}>PHONE{loginType === 'password' && '/USERNAME'}</div>
      <LoginFormInput name="account" defaultValue="lynnkoo" />
      <div className={cx('login-label')}>
        {loginType === 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      {loginType === 'password' && (
        <LoginFormInput name="password" defaultValue="111111">
          <div className={cx('login-send-code')}>FORGET PASSWORD</div>
        </LoginFormInput>
      )}
      {loginType === 'code' && (
        <LoginFormInput name="code">
          <div className={cx('login-send-code')} onClick={onSendCode}>
            SEND CODE
          </div>
        </LoginFormInput>
      )}
      <div className={cx('login-change-type')} onClick={onChangeType}>
        LOGIN BY {loginType !== 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      <div className={cx('login-form-btn', { loading })} onClick={onLogin}>
        LOGIN{(LoginLoading || verifyLoading) && '...'}
      </div>
      <div className={cx('login-form-btn')} onClick={toRegister}>
        REGISTER
      </div>
    </form>
  )
}

export const LoginForm = enhanceFormComponent(TLoginForm)
