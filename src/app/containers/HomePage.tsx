import * as React from 'react'
import styles from './styles/HomePage.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { Link, useLocation } from 'react-router-dom'
import { accountAsyncAction } from '../../shared/smoex-frontend-basic/logics/account/actions'
import { homeSlice } from 'common/slices/home'
import {
  FullScreenModal,
  MessageModal,
} from 'shared/smoex-moblie-basic/components/FullScreenModal'
import { useToggleToast } from 'shared/react-dom-basic-kit'
const cx = transformStyles(styles)

// name = Home
type IHomePageProps = {
  className?: string
}

export const HomePage: React.FC = (props: any) => {
  const { className } = props
  const [updateInfo, loading, error] = homeSlice.useAction(
    accountAsyncAction.getInfo,
  )
  const account = homeSlice.useSelector((home: any) => home.account)
  const [count, setCount] = React.useState(0)
  const onUpdateInfo = React.useCallback(() => {
    updateInfo(count)
  }, [count])
  const [visible, setVisible] = React.useState(true)
  const location = useLocation()

  const toggleToast = useToggleToast(`testsdfafasd asdsa das dadsa asd asd asd`)
  const toggle = () => {
    toggleToast()
    setCount((x) => x * x)
  }

  return (
    <section className={cx('home-page')}>
      <div>{account.name} </div>
      <div onClick={onUpdateInfo}>UPDATE NAME</div>
      <div>{count}</div>
      <div onClick={() => setCount((x) => x + 1)}>ADD COUNT</div>
      <div>{loading && 'loading'}</div>
      <div>{account.loading && 'account loading'}</div>
      <div>{error && 'error: ' + JSON.stringify(error)}</div>
      <Link to="/search">TO SEARCH</Link>
      <br />
      <Link to="/notfound">TO NOTFOUND</Link>
      <br />
      <br />
      <Link to="/word">TO WORDS</Link>
      <br />
      <br />
      <div onClick={toggle}>TEST TOAST</div>
    </section>
  )
}

export default HomePage
