import * as React from 'react'
import styles from './styles/Modal.module.scss'
import { enhancePopupComponent, usePopupShown } from 'react-dom-basic-kit'
import { transformStyles } from 'react-dom-basic-kit'
import { DrawerModal } from './DrawerModal'
import { asModalProps } from 'react-dom-basic-kit'
import { ShadowModal } from './ShadowModal'

const cx = transformStyles(styles)

// const TConfirmModal: React.FC<any> = (props: any) => {
//   const { isOpen, onClose, onRemove, onConfirm } = props
//   const shown = usePopupShown(isOpen)
//   const onConfirmClick = () => {
//     if (onConfirm) {
//       onConfirm()
//     }
//     onClose()
//   }
//   return (
//     <div
//       className={cx('confirm-modal', { shown })}
//       onTransitionEnd={onRemove}
//     >
//       {/* <div onClick={() => onClose()}>{` `}</div> */}
//       {props.children}
//       <div className={cx('confirm-btn')} onClick={onConfirmClick}>
//         CONFIRM
//       </div>
//     </div>
//   )
// }

export const TConfirmModal: React.FC<any> = (props) => {
  const { isOpen, onClose, onRemove, onConfirm } = props
  const shown = usePopupShown(isOpen)
  const onConfirmClick = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }
  return (
    <ShadowModal {...asModalProps(props)}>
      <div className={cx('confirm-modal', { shown })}>
        {/* <div onClick={() => onClose()}>{` `}</div> */}
        {props.children}
        <div className={cx('confirm-btn')} onClick={onConfirmClick}>
          CONFIRM
        </div>
      </div>
    </ShadowModal>
  )
}
export const ConfirmModal = enhancePopupComponent(TConfirmModal)
