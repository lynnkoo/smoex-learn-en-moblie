import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
} from 'shared/react-dom-basic-kit/components/Popup'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'

const cx = transformStyles(styles)

const TConfirmModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, onRemove, onConfirm } = props
  const shown = usePopupShown(isOpen)
  const onTransitionEnd = React.useCallback(() => {
    if (!shown) {
      onRemove()
    }
  }, [shown])
  const onConfirmClick = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }
  return (
    <div
      className={cx('confirm-modal', { shown })}
      onTransitionEnd={onTransitionEnd}
    >
      {/* <div onClick={() => onClose()}>{` `}</div> */}
      {props.children}
      <div className={cx('confirm-btn')} onClick={onConfirmClick}>
        CONFIRM
      </div>
    </div>
  )
}
export const ConfirmModal = enhancePopupComponent(TConfirmModal)
