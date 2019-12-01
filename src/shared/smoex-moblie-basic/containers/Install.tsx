import * as React from 'react'
import styles from './styles/App.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { updateOffsetTop } from '../components/DrawerModal'
const cx = transformStyles(styles)

export const Install: React.FC<any> = (props) => {
  const [visible, setVisible] = React.useState(true)
  const installRef = React.useRef<HTMLDivElement>()
  const onClose = () => {
    setVisible(false)
    updateOffsetTop(installRef.current)
  }
  return (
    visible && (
      <div className={cx('install')} ref={installRef}>
        <div onClick={onClose}>X</div>
        <div>open app</div>
      </div>
    )
  )
}
