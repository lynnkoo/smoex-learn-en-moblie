import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'

import { useToggleModal, asModalProps } from 'shared/react-dom-basic-kit'
import { Link, NavLink } from 'react-router-dom'
import { MenuModal } from './MenuModal'

const cx = transformStyles(styles)

export const Header: React.FC = () => {
  const [count, setCount] = React.useState(0)
  const [overlay, setOverlay] = React.useState(true)
  const toggleModal = useToggleModal(
    (mProps: any) => (
      <MenuModal {...asModalProps(mProps)} setOverlay={setOverlay} />
    ),
    [count],
  )

  const onToggleModal = () => {
    toggleModal()
    setCount((x) => x + 1)
  }
  return (
    <header id="Header" className={cx('header')}>
      <div className={cx('header-wrapper', { overlay })}>
        <NavLink
          exact
          to={'/'}
          className={cx('header-logo')}
          activeClassName={cx('header-logo--disable')}
        >
          LOGO
        </NavLink>
        <div className={cx('header-menu')} onClick={onToggleModal}>
          MENU
        </div>
      </div>
    </header>
  )
}
