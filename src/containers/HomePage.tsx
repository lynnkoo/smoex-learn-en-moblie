import * as React from 'react'
import styles from './styles/HomePage.module.scss'
import { transformStyles } from 'react-dom-basic-kit'
import { Link, useLocation } from 'react-router-dom'
import { accountAsyncAction } from 'smoex-common-business'
import { homeSlice } from 'common/slices/home'
import { FullScreenModal, MessageModal } from 'smoex-mobile-basic'
import { useToggleToast } from 'react-dom-basic-kit'
const cx = transformStyles(styles)

// name = Home
type IHomePageProps = {
  className?: string
}

const mocks = [
  {
    id: 1,
    title: '上海·第六届FXACG动漫展',
    model: 'DamagedHelmet.gltf',
    price: 100,
    follows: 10,
    desc: 'AACG妖舞国风动漫游戏展',
    labels: ['新人卷后 233 元'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687029&di=e444fe0dd434beefed504dc953c38258&imgtype=0&src=http%3A%2F%2Fpic8.58cdn.com.cn%2Fzhuanzh%2Fn_v248476596084742f39fb8ca68e100d7b7.jpg%3Fw%3D750%26h%3D0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687028&di=5a2c7ac5ecdf1a300dff234c4915ff04&imgtype=0&src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2018%2F684%2F790%2F8660097486_1668600357.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687028&di=5baf3e0786172e9cb5c6b4d35fc5127a&imgtype=0&src=http%3A%2F%2Fpic8.58cdn.com.cn%2Fzhuanzh%2Fn_v2648efc0dffb54764b308d10a37c4e3f7.jpg%3Fw%3D750%26h%3D0',
    ],
  },
  {
    id: 2,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    price: 222,
    follows: 22222,
    desc: 'AACG妖舞国风动漫游戏展',
    labels: ['免费玩', '新品'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687027&di=ef7fd3b3b9016e53ac8f8bf775f88049&imgtype=0&src=http%3A%2F%2Fres.hpoi.net.cn%2Fgk%2Fcover%2Fraw%2F2016%2F03%2Fd4b68536f889493cb840175b92bcc031.jpg%3Fdate%3D1459009312000',
    ],
  },
  {
    id: 8,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    price: 222,
    follows: 22222,
    desc: 'AACG妖舞国风动漫游戏展',
    labels: ['免费玩', '新品'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687027&di=ef7fd3b3b9016e53ac8f8bf775f88049&imgtype=0&src=http%3A%2F%2Fres.hpoi.net.cn%2Fgk%2Fcover%2Fraw%2F2016%2F03%2Fd4b68536f889493cb840175b92bcc031.jpg%3Fdate%3D1459009312000',
    ],
  },
  {
    id: 9,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    labels: ['免费玩', '新品'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687027&di=ef7fd3b3b9016e53ac8f8bf775f88049&imgtype=0&src=http%3A%2F%2Fres.hpoi.net.cn%2Fgk%2Fcover%2Fraw%2F2016%2F03%2Fd4b68536f889493cb840175b92bcc031.jpg%3Fdate%3D1459009312000',
    ],
  },
  {
    id: 7,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    desc: 'AACG妖舞国风动漫游戏展',
    model: 'DamagedHelmet.gltf',
    price: 222,
    follows: 22222,
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687025&di=934778f19278ca62293f399fbc097035&imgtype=0&src=http%3A%2F%2Ftva2.sinaimg.cn%2Flarge%2F006yt1Omgy1gd0qdsisboj30go0m84f1.jpg',
    ],
  },
  {
    id: 3,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687025&di=91eda38461caeb71ea54591f0174ed9f&imgtype=0&src=http%3A%2F%2Foegquov59.qnssl.com%2Fuploadfile%2F2015%2F121820%2F201512182035171199.jpg',
    ],
  },
  {
    id: 4,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687025&di=934778f19278ca62293f399fbc097035&imgtype=0&src=http%3A%2F%2Ftva2.sinaimg.cn%2Flarge%2F006yt1Omgy1gd0qdsisboj30go0m84f1.jpg',
    ],
  },
  {
    id: 5,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687025&di=934778f19278ca62293f399fbc097035&imgtype=0&src=http%3A%2F%2Ftva2.sinaimg.cn%2Flarge%2F006yt1Omgy1gd0qdsisboj30go0m84f1.jpg',
    ],
  },
  {
    id: 6,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687025&di=934778f19278ca62293f399fbc097035&imgtype=0&src=http%3A%2F%2Ftva2.sinaimg.cn%2Flarge%2F006yt1Omgy1gd0qdsisboj30go0m84f1.jpg',
    ],
  },
  {
    id: 10,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    labels: ['免费玩', '新品'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687027&di=ef7fd3b3b9016e53ac8f8bf775f88049&imgtype=0&src=http%3A%2F%2Fres.hpoi.net.cn%2Fgk%2Fcover%2Fraw%2F2016%2F03%2Fd4b68536f889493cb840175b92bcc031.jpg%3Fdate%3D1459009312000',
    ],
  },
  {
    id: 11,
    title: '上海·天空之城-久石让•宫崎骏动漫作品音乐会',
    model: 'DamagedHelmet.gltf',
    desc: 'AACG妖舞国风动漫游戏展',
    price: 222,
    follows: 22222,
    labels: ['免费玩', '新品'],
    imgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588674687027&di=ef7fd3b3b9016e53ac8f8bf775f88049&imgtype=0&src=http%3A%2F%2Fres.hpoi.net.cn%2Fgk%2Fcover%2Fraw%2F2016%2F03%2Fd4b68536f889493cb840175b92bcc031.jpg%3Fdate%3D1459009312000',
    ],
  },
]

export const MOCKS_MAP = {}

for (const mock of mocks) {
  MOCKS_MAP[mock.id] = mock
}

export const HomePage: React.FC = (props: any) => {
  const { className } = props
  const [updateInfo, loading, error] = homeSlice.useAction(accountAsyncAction.getInfo)
  const account = homeSlice.useSelector((home: any) => home.account)
  const [count, setCount] = React.useState(0)
  const onUpdateInfo = React.useCallback(() => {
    updateInfo(count)
  }, [count])
  const [visible, setVisible] = React.useState(true)
  const location = useLocation()

  const toggleToast = useToggleToast()
  const toggle = () => {
    toggleToast(`testsdfafasd asdsa das dadsa asd asd asd`)
    setCount((x) => x * x)
  }

  return (
    <section className={cx('home-page')}>
      <header className={cx('header')}>
        <Link className={cx('header-link')} to="/">
          会员购
        </Link>
      </header>
      <div className={cx('content-wrapper')}>
        <div className={cx('card-wrapper')}>
          {mocks.map((x, i) => (
            <Link key={i} className={cx('home-card')} to={`/detail/${x.id}`}>
              <img className={cx('card-img')} src={x.imgs && x.imgs[0]} />
              <div className={cx('card-info')}>
                <div className={cx('card-title')}>{x.title}</div>
                <div className={cx('card-labels')}>
                  {x.labels &&
                    x.labels.map((l, i) => (
                      <span key={i} className={cx('card-label')}>
                        {l}
                      </span>
                    ))}
                </div>
                <div className={cx('card-extra')}>
                  <div className={cx('card-price')}>
                    <span>¥</span>
                    <span className={cx('card-price-num')}>{x.price}</span>
                  </div>
                  <div className={cx('card-follows')}>{x.follows} 人想要</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
