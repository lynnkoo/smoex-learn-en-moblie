import * as React from 'react'
import qs from 'qs'
import styles from './styles/WordCardPage.module.scss'
import { transformStyles } from 'shared/react-dom-basic-kit/utils'
import { useAsyncCallback } from 'shared/redux-async-kit'
import { api } from 'shared/smoex-frontend-basic/utils'
import AxiosClient from 'axios'
import { usePageProps } from 'shared/smoex-moblie-basic/containers/PageRouter'
import { useLocation } from 'react-router'
import { useModalState, asModalProps } from 'shared/react-dom-basic-kit'
import { ConfirmModal } from '../../shared/smoex-moblie-basic/components/ConfirmModal'
import jsonp from 'jsonp'
const cx = transformStyles(styles)

type IWordCardPageProps = {}

export const fetchAPI = AxiosClient.create({
  baseURL: process.env.PUBLIC_URL,
  // baseURL: 'https://api.smoex.com',
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
export const fetchTrans = AxiosClient.create({
  baseURL: 'http://fanyi.youdao.com',
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
// http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=计算

const getPage = (book: string) => {
  const str = localStorage.getItem(book)
  if (str) {
    const info = JSON.parse(str)
    return info
  }
  return null
}

function useCircularCounter(max: number, min = 0): [number, any] {
  const [count, setCount] = React.useState(-1)
  const setOffset = React.useCallback(
    (offset: number) => () => {
      setCount((idx) => {
        const pos = idx + offset
        const len = max - 1
        if (pos < 0) {
          return len
        } else if (pos > len) {
          return 0
        }
        return pos
      })
    },
    [max],
  )
  React.useEffect(() => {
    if (max > 0) {
      setCount(0)
    }
  }, [max])
  return [count, setOffset]
}

function useLocationSearch() {
  const { search } = useLocation()
  return qs.parse(search, { ignoreQueryPrefix: true })
}

export const WordCardPage: React.FC<IWordCardPageProps> = (props: any) => {
  const search = useLocationSearch()
  const [words, setWords] = React.useState([])
  const [trans, setTrans] = React.useState('')
  const [idx, onChangeCard] = useCircularCounter(words.length)
  const audioRef = React.useRef<HTMLAudioElement>()
  const word = words[idx] || {}
  usePageProps({ showFooter: false })

  const onConfirm = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const [showConfirm, closeConfirm] = useModalState((mProps: any) => (
    <ConfirmModal {...asModalProps(mProps)} onConfirm={onConfirm}>
      <div>Please confirm for play audio.</div>
    </ConfirmModal>
  ))

  React.useEffect(() => {
    const resp = fetchAPI.get(`/wordlist/${search.book}.txt`)
    resp.then(({ data }) => {
      const wordlist: string[] = data.split('\n')
      const infos = wordlist.filter(Boolean).map((x) => {
        const m = x.split('--')
        return {
          chars: m[0].replace(/ /g, ''),
          voice: m[0],
          en: m[1],
        }
      })
      setWords(infos)
    })
  }, [])

  React.useEffect(() => {
    const info = getPage(search.book)
    if (words.length > 0 && info) {
      onChangeCard(info.page)()
    }
  }, [words, onChangeCard])

  React.useEffect(() => {
    if (idx === -1) {
      return
    }
    localStorage.setItem(
      search.book,
      JSON.stringify({
        page: idx,
        max: words.length,
      }),
    )
  }, [idx, words])

  React.useEffect(() => {
    if (idx !== -1 && audioRef.current) {
      //   const url = `http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie
      // =UTF-8&sl=auto&tl=zh_CN&q=${word.chars}`
      //   jsonp(url, null, (err, data) => {
      //     if (err) {
      //         console.log(err)
      //     } else {
      //         console.log(data)
      //     }
      // })
      audioRef.current.play().catch((e) => {
        showConfirm()
      })
    }
  }, [idx, word])

  const onPlayAudio = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [word])

  return (
    <section className={cx('word-card-page')}>
      <div className={cx('word-num')}>
        {idx + 1}/{words.length}
      </div>
      <div className={cx('word-text')} onClick={onPlayAudio}>
        <div>{word.chars}</div>
        <div className={cx('word-voice')}>{word.voice}</div>
        {trans && <div className={cx('word-trans')}>{trans}</div>}
      </div>
      {word.en && <div className={cx('meaning-en')}>{word.en}</div>}
      <div className={cx('card-actions')}>
        <div className={cx('card-prev')} onClick={onChangeCard(-1)}>
          PREV
        </div>
        <div className={cx('card-next')} onClick={onChangeCard(1)}>
          NEXT
        </div>
      </div>
      {word.chars && (
        <audio
          preload="none"
          ref={audioRef}
          src={`http://media.shanbay.com/audio/us/${word.chars}.mp3`}
        />
      )}
    </section>
  )
}

export default WordCardPage
