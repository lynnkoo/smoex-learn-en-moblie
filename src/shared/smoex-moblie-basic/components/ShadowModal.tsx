import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  IPopupProps,
  usePopupLayerOverlay,
} from 'react-dom-basic-kit'

import { transformStyles } from 'react-dom-basic-kit'
import { cloneModalContent } from 'react-dom-basic-kit'

const cx = transformStyles(styles)

type IDrawerModalProps = IPopupProps & {
  children: React.ReactElement
  enableClose?: boolean
}

const TShadowModal: React.FC<IDrawerModalProps> = (props) => {
  const { isOpen, onClose, onRemove, enableClose, children } = props
  const shown = usePopupShown(isOpen)
  const onRemoveModal = usePopupLayerOverlay(shown, onRemove)

  return (
    <div
      className={cx('shadow-modal', { shown })}
      onClick={enableClose && onClose}
      onTransitionEnd={onRemoveModal}
    >
      {cloneModalContent(children)}
    </div>
  )
}

export const ShadowModal = enhancePopupComponent(TShadowModal)
