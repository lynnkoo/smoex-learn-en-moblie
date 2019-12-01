import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  IPopupProps,
  usePopupLayerOverlay,
} from 'shared/react-dom-basic-kit/components/Popup'

import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { cloneModalContent } from 'shared/react-dom-basic-kit'

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
