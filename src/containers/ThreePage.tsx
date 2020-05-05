import * as React from 'react'

import styles from './styles/DetailPage.module.scss'
import { transformStyles } from 'react-dom-basic-kit'
import { Scene, Color, PerspectiveCamera, WebGLRenderer, AmbientLight } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MOCKS_MAP } from './HomePage'
import { useParams } from 'react-router'
const cx = transformStyles(styles)

type ISearchPageProps = {}

export const ThreePage: React.FC<any> = (props: any) => {
  const containerRef = React.useRef<HTMLDivElement>()
  React.useEffect(() => {
    // (window as any)['PUBLIC_URL'] = process.env.PUBLIC_URL
    // if (!containerRef.current) {
    //   return
    // }
    // const scene = new Scene();
    // scene.background = new Color( 0xa0a0a0 );
    // const ambient = new AmbientLight(0xffffff);
    // scene.add(ambient)
    // const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // camera.position.z = 5;
    // const renderer = new WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // const loader = new GLTFLoader();
    // loader.load(`${process.env.PUBLIC_URL}/3d/${'DamagedHelmet'}.gltf`, ( gltf ) => {
    //   console.log(gltf)
    //   scene.add( gltf.scene );
    //   const animate = () => {
    //       requestAnimationFrame( animate );
    //       renderer.render( scene, camera );
    //   };
    //   animate();
    // }, undefined, ( error ) => {
    //     console.error( error );
    // })
    // const controls = new OrbitControls(camera, renderer.domElement)
    // renderer.render( scene, camera );
  }, [])
  const { id } = useParams()
  const detail = props.detail || {}
  console.log('111', props, detail)
  return (
    <iframe
      frameBorder="none"
      width={window.innerWidth}
      height={window.innerHeight}
      className={cx('frame')}
      src={`${`https://public.smoex.com`}/index.html?file=${detail.model}`}
    />
  )
}

export default ThreePage
