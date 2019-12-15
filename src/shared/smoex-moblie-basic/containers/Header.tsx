import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'

import { useToggleModal, asModalProps } from 'shared/react-dom-basic-kit'
import { NavLink } from 'react-router-dom'
import { MenuModal } from './MenuModal'
import { usePageProps } from 'shared/smoex-moblie-basic/containers/PageRouter'

const cx = transformStyles(styles)

export const Header: React.FC<any> = (props) => {
  const { showInstall } = usePageProps()
  const toggleModal = useToggleModal(MenuModal, [showInstall])

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
        <div className={cx('header-menu')} onClick={toggleModal}>
          MENU
        </div>
      </div>
    </header>
  )
}
