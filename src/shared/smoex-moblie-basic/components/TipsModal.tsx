import * as React from 'react'
import styles from './styles/Modal.module.scss'
import { DrawerModal } from '../components/DrawerModal'
import { usePopupShown } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'

import { asModalProps } from 'react-dom-basic-kit'
import { ShadowModal } from './ShadowModal'

const cx = transformStyles(styles)

export const TipsModal: React.FC<any> = (props) => {
  const { children } = props
  const shown = usePopupShown(props.isOpen)
  return (
    <ShadowModal {...asModalProps(props)} enableClose={true}>
      <div className={cx('tips-modal', { shown })}>{children}</div>
    </ShadowModal>
  )
}
