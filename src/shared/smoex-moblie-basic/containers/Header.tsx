import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'

import { useToggleModal, asModalProps } from 'shared/react-dom-basic-kit'
import { NavLink } from 'react-router-dom'
import { MenuModal } from './MenuModal'

const cx = transformStyles(styles)

export const Header: React.FC<any> = (props) => {
  const toggleModal = useToggleModal(MenuModal)

  const onToggleModal = () => {
    toggleModal()
  }

  return (
    <header id="Header" className={cx('header')}>
      <div className={cx('header-wrapper')}>
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
