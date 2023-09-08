import {
  Stage,
  PresentationControls,
  Environment,
  useTexture,
  Loader,
} from '@react-three/drei'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3, MathUtils, LinearSRGBColorSpace } from 'three'

import { Suspense, useState, useRef } from 'react'

import { Cup } from '../components/Cup'
import { Bowl } from '../components/Bowl'

import Button from '../components/Button'
import ColorRadio from '../components/ColorRadio/ColorRadio'
import ColorRadioItem from '../components/ColorRadio/ColorRadioItem'
import LoadingScreen from '../components/LoadingScreen'

import shinyGlazes from '../data/shinyGlazes'
import mattGlazes from '../data/mattGlazes'
import clays from '../data/clays'
import parts from '../data/parts'

function DownloadCanvasAsImage() {
  let downloadLink = document.createElement('a')
  downloadLink.setAttribute('download', 'MyConfiguration.png')
  let canvas = document.getElementById('canvas')?.childNodes[0].childNodes[0]

  let dataURL = canvas.toDataURL('image/png')
  let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')
  downloadLink.setAttribute('href', url)
  downloadLink.click()
}

const Configurator = () => {
  const [glaze, setGlaze] = useState('Botz Transparent')
  const [clay, setClay] = useState('Basic Beige')
  const [part, setPart] = useState('Completely glazed')
  const [start, setStart] = useState(false) // für Loading Screen
  const [model, setModel] = useState('Cup')

  const onGlazeOptionChange = (e) => {
    setGlaze(e.target.value)
  }

  const onClayOptionChange = (e) => {
    setClay(e.target.value)
  }

  const onPartOptionChange = (e) => {
    setPart(e.target.value)
  }

  const onModelChange = (model) => {
    setModel(model)
  }

  return (
    <>
      <Canvas
        className='canvas'
        shadows
        id='canvas'
        gl={{ preserveDrawingBuffer: true }}
        // linear // Switch off automatic sRGB color space and gamma correction
        // flat // Use THREE.NoToneMapping instead of THREE.ACESFilmicToneMapping
      >
        <Suspense fallback={null}>
          <PresentationControls
            // speed={1.5}
            global
            // rotation={[0, 0, 0]}
            zoom={0.5}
            polar={[-1, Math.PI / 2]}
          >
            <Stage
              preset='soft'
              intensity={0}
              environment={null}
              shadows={{
                type: 'accumulative',
                color: '#f3f5f9',
                colorblend: 0.5,
                opacity: 0.5,
              }}
              adjustCamera={1.5}
            >
              <Environment
                background={false} // Whether to affect scene.background
                files={'lebombo_1k.hdr'}
                path={'/static/'}
              />
              {model === 'Cup' && <Cup clay={clay} glaze={glaze} />}
              {model === 'Bowl' && <Bowl clay={clay} glaze={glaze} />}
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <h1 className='title'>Pascale Schmidt - Ceramic Configurator</h1>
      <div className='ui'>
        <div className='sidebar'>
          <div className='sidebar__body'>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Product</h3>
              <span className='sidebar__selection'>{model}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                <ColorRadioItem
                  name='model'
                  value='Cup'
                  image='/static/Cup.png'
                  alt='Cup'
                  defaultChecked={model === 'Cup'}
                  onClick={() => onModelChange('Cup')}
                />
                <ColorRadioItem
                  name='model'
                  value='Bowl'
                  image='/static/Bowl.png'
                  alt='Bowl'
                  defaultChecked={model === 'Bowl'}
                  onClick={() => onModelChange('Bowl')}
                />
              </ColorRadio>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Type of Clay</h3>
              <span className='sidebar__selection'>{clay}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                {clays.map((clayItem) => {
                  return (
                    <ColorRadioItem
                      key={clayItem._id}
                      name='clayItem'
                      value={clayItem.value}
                      image={clayItem.src}
                      alt={clayItem.alt}
                      defaultChecked={clay === clayItem.value}
                      onClick={onClayOptionChange}
                    />
                  )
                })}
              </ColorRadio>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Type of Glaze</h3>
              <span className='sidebar__selection'>{glaze}</span>
            </div>
            <div className='sidebar__item'>
              <form name='glazeParams' id='glazeParams'>
                <ColorRadio>
                  {shinyGlazes.map((glazeItem, index) => (
                    <ColorRadioItem
                      key={index}
                      name='glaze'
                      value={glazeItem.value}
                      image={glazeItem.src}
                      alt={glazeItem.alt}
                      defaultChecked={glaze === glazeItem.value}
                      onClick={onGlazeOptionChange}
                    />
                  ))}
                </ColorRadio>
                <ColorRadio>
                  {mattGlazes.map((glazeItem, index) => (
                    <ColorRadioItem
                      key={index}
                      name='glaze'
                      value={glazeItem.value}
                      image={glazeItem.src}
                      alt={glazeItem.alt}
                      defaultChecked={glaze === glazeItem.value}
                      onClick={onGlazeOptionChange}
                    />
                  ))}
                </ColorRadio>
              </form>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Parts of Glazing</h3>
              <span className='sidebar__selection'>{part}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                {parts.map((partsItem, index) => (
                  <ColorRadioItem
                    key={index}
                    name='parts'
                    value={partsItem.value}
                    image={partsItem.src}
                    alt={partsItem.alt}
                    defaultChecked={part === partsItem.value}
                    onClick={onPartOptionChange}
                  />
                ))}
              </ColorRadio>
            </div>
          </div>
          <div className='sidebar__footer'>
            <Button label={'Save as image'} onClick={DownloadCanvasAsImage} />
            <Button label={'View in AR'} outline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Configurator
