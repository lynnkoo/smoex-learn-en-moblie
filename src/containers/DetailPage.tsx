import * as React from 'react'

import styles from './styles/DetailPage.module.scss'
import { transformStyles, asModalProps, useModal } from 'react-dom-basic-kit'
import { FullScreenModal } from './TempModal'
import ThreePage from './ThreePage'
import { useLocation, useParams } from 'react-router'
import { MOCKS_MAP } from './HomePage'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
const cx = transformStyles(styles)

type ISearchPageProps = {}

// export const ThreeModal: React.FC<any> = (props) => {
//   return (
//     <FullScreenModal {...asModalProps(props)}>
//       <ThreePage detail= />
//     </FullScreenModal>
//   )
// }

export const DetailPage: React.FC<ISearchPageProps> = (props: any) => {
  const { id } = useParams()
  console.log(id)
  const detail = MOCKS_MAP[id] || {}

  const [showModal] = useModal(
    (mProps: any) => (
      <FullScreenModal {...mProps}>
        <ThreePage detail={detail} />
      </FullScreenModal>
    ),
    [detail],
  )

  return (
    <div className={cx('detail-page')}>
      <Link to={'/'} className={cx('detail-back')}>
        &lt;
      </Link>
      <div className={cx('detail-imgs')}>
        <Carousel>
          {detail.imgs &&
            detail.imgs.map((img: string, i: number) => (
              <div className={cx('detail-img')} key={i} style={{ backgroundImage: `url(${img})` }}>
                {i === 0 && (
                  <div className={cx('detail-3d')} onClick={showModal}>
                    3D
                  </div>
                )}
                <div className={cx('detail-img-idx')}>
                  {i + 1}/{detail.imgs.length}
                </div>
              </div>
            ))}
        </Carousel>
      </div>
      <div className={cx('detail-tips')}>
        预售定金
        <span className={cx('tips-price-cur')}>¥</span>
        <span className={cx('tips-price-num')}>{detail.price}</span>
      </div>
      <div className={cx('detail-info')}>
        <div className={cx('detail-title')}>{detail.title}</div>
        <div className={cx('detail-desc')}>{detail.desc}</div>
        <div className={cx('detail-price')}>
          全款
          <span className={cx('detail-price-cur')}>¥</span>
          <span className={cx('detail-price-num')}>{detail.price}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
