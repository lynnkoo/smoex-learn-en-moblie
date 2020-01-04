import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  IPopupProps,
  usePopupLayerOverlay,
} from '../components/Popup'

import { transformStyles, cloneModalContent } from '../index'

const cx = transformStyles(styles)

type IDrawerModalProps = IPopupProps & {
  children: React.ReactElement
  blankClose?: boolean
  className?: string
}

const TModal: React.FC<IDrawerModalProps> = (props) => {
  const { isOpen, onClose, onRemove, blankClose, children, className } = props
  const shown = usePopupShown(isOpen)
  const onRemoveModal = usePopupLayerOverlay(shown, onRemove)

  return (
    <div
      className={cx('modal', className, { shown })}
      onClick={blankClose && onClose}
      onTransitionEnd={onRemoveModal}
    >
      {cloneModalContent(children)}
    </div>
  )
}

export const Modal = enhancePopupComponent(TModal)
