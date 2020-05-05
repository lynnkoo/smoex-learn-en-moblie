import * as React from 'react'
import styles from './styles/TempModal.module.scss'
import { enhancePopupComponent, usePopupShown, transformStyles } from 'react-dom-basic-kit'

const cx = transformStyles(styles)

const TFullScreenModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, onRemove } = props
  const shown = usePopupShown(isOpen)
  const onTransitionEnd = React.useCallback(() => {
    if (!shown) {
      onRemove()
    }
  }, [shown])
  React.useEffect(() => {
    const popupLayerNode = document.getElementById('PopupLayer')
    if (popupLayerNode) {
      if (shown) {
        popupLayerNode.style.zIndex = '1'
      } else {
        popupLayerNode.style.zIndex = null
      }
    }
  }, [shown])
  return (
    <div className={cx('full-screen-modal', { shown })} onTransitionEnd={onTransitionEnd}>
      <div className={cx('full-screen-header')} onClick={() => onClose()}>
        X
      </div>
      <div className={cx('full-screen-content')}>{props.children}</div>
    </div>
  )
}
export const FullScreenModal = enhancePopupComponent(TFullScreenModal)

const TMessageSModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose } = props
  return (
    <div className={cx('full-screen-modal')}>
      <div onClick={() => onClose()}>CLOSESS2222222</div>
      {props.children}
    </div>
  )
}
export const MessageModal = enhancePopupComponent(TMessageSModal)
