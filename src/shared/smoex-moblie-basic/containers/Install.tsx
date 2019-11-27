import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
const cx = transformStyles(styles)

export const Install = () => {
  const [visible, setVisible] = React.useState(true)
  const onClose = () => {
    setVisible(false)
  }
  return (
    visible && (
      <div className={cx('install')}>
        <div onClick={onClose}>X</div>
        <div>open app</div>
      </div>
    )
  )
}
