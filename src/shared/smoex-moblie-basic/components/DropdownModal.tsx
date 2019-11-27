import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
} from 'shared/react-dom-basic-kit/components/Popup'

import { transformStyles } from 'shared/react-dom-basic-kit/utils'

const cx = transformStyles(styles)

function getOffsetTop() {
  const headerNode = document.getElementById('Header')
  if (headerNode) {
    const { bottom } = headerNode.getBoundingClientRect()
    return bottom
  }
  return 0
}

const TDrawerModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, onRemove } = props
  const shown = usePopupShown(isOpen)
  const onTransitionEnd = React.useCallback(() => {
    if (!shown) {
      onRemove()
    }
  }, [shown])

  return (
    <div
      className={cx('dropdown-modal', { shown })}
      style={{ top: getOffsetTop() }}
      onClick={onClose}
      onTransitionEnd={onTransitionEnd}
    >
      {React.cloneElement(props.children, {
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      })}
    </div>
  )
}

export const DropdownModal = enhancePopupComponent(TDrawerModal)
