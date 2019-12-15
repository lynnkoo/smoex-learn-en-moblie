import * as React from 'react'
import { FullScreenModal } from '../components/FullScreenModal'
import styles from './styles/LoginModal.module.scss'
import {
  asModalProps,
  useToggleToast,
  useModal,
} from 'shared/react-dom-basic-kit'
import { useFormState } from 'shared/react-dom-basic-kit/components/Form'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { enhanceFormComponent } from 'shared/react-dom-basic-kit/components/Form'
import {
  useActionCallback,
  useAsyncCallback,
  useCurrentCallback,
} from 'shared/redux-async-kit'
import { accountAsyncAction } from 'shared/smoex-frontend-basic/logics/account/actions'
import { LoginFormInput } from './LoginModal'
import { commonSlice } from 'shared/smoex-frontend-basic'
import { useErrorToast } from './LoginForm'
import { ConfirmModal } from '../components/ConfirmModal'

const cx = transformStyles(styles)

const TRegisterForm: React.FC<any> = (props) => {
  const { translateForm, onCloseModal } = props
  const [data] = useFormState()

  const toggleToast = useToggleToast()

  const [showConfirm] = useModal((mProps: any) => (
    <ConfirmModal {...mProps}>
      Register success <br />
      Please complate your information.
    </ConfirmModal>
  ))

  const [sendCode, sendLoading] = commonSlice.useAction(
    accountAsyncAction.sendCode,
  )
  const [verify, verifyLoading] = commonSlice.useAction(
    accountAsyncAction.verifyCode,
  )
  const account = commonSlice.useSelector((state: any) => state.account.payload)

  const onRegistered = useCurrentCallback(() => {
    if (account.group === 'member') {
      toggleToast('already register so to login')
      onCloseModal()
    } else {
      showConfirm()
    }
  }, [account])

  const [onRegister, registerError] = useActionCallback(async () => {
    const { code } = data
    await verify(code, 'register')
    onRegistered.current()
  }, [data, verify, account])

  const [onSendCode, sendCodeError] = useActionCallback(async () => {
    const { account } = data
    await sendCode(account, 'register')
  }, [sendCode, data])

  useErrorToast(registerError)
  useErrorToast(sendCodeError)
  return (
    <form className={cx('login-form')}>
      <div className={cx('login-label')}>PHONE</div>
      <LoginFormInput name="account" />
      <div className={cx('login-label')}>VERIFY CODE</div>
      <LoginFormInput name="code">
        <div className={cx('login-send-code')} onClick={onSendCode}>
          SEND CODE
        </div>
      </LoginFormInput>
      <div className={cx('login-back')} onClick={() => translateForm('login')}>
        Back
      </div>
      <div className={cx('login-form-btn')} onClick={onRegister}>
        REGISTER{verifyLoading && '...'}
      </div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
      <div className={cx('for-test-scroll')}>FOR TEST SCROLL</div>
    </form>
  )
}

export const RegisterForm = enhanceFormComponent(TRegisterForm)
