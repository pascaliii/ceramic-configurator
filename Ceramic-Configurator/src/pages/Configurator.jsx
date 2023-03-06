import {
  Stage,
  PresentationControls,
  Environment,
  useTexture,
  Loader,
  // CameraControls,
} from '@react-three/drei'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Vector3, MathUtils } from 'three'

import { Suspense, useState, useRef } from 'react'

import Button from '../components/Button'
import ColorRadio from '../components/ColorRadio/ColorRadio'
import ColorRadioItem from '../components/ColorRadio/ColorRadioItem'
import Cup from '../components/Cup'
import { LoadingScreen } from '../components/LoadingScreen'

// const { DEG2RAD } = MathUtils

const Configurator = () => {
  // const cameraControlsRef = useRef()

  const [textures, setTextures] = useState([
    '/textures/clay_basic/clay_floor_001_diff_1k.jpg',
    './textures/clay_basic/clay_floor_001_nor_gl_1k.jpg',
    './textures/clay_basic/clay_floor_001_disp_1k.jpg',
    // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  ])

  const [
    colorMap,
    normalMap,
    displacementMap,
    aoMap,
    roughnessMap,
    metalnessMap,
  ] = useLoader(TextureLoader, textures)

  const [color, setColor] = useState('')

  const [start, setStart] = useState(false)

  // const handleGlazeColor = (color) => {
  //   switch (color) {
  //     case 'green':
  //       setTextures([
  //         '/textures/clay_spreckled/gravel_concrete_diff_1k.jpg',
  //         './textures/clay_spreckled/gravel_concrete_nor_gl_1k.jpg',
  //         './textures/clay_spreckled/gravel_concrete_disp_1k.jpg',
  //         './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
  //         './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
  //         './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
  //       ])
  //       break
  //     case 'blue':
  //       setColor('#000080')
  //       break
  //     default:
  //       return
  //   }
  // }

  return (
    <>
      <Canvas className='canvas' shadows>
        {/* <CameraControls ref={cameraControlsRef} /> */}
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage
              preset='soft'
              intensity={0.1}
              environment='apartment'
              shadows={{
                type: 'accumulative',
                color: '#f3f5f9',
                colorblend: 0.5,
                opacity: 0.5,
              }}
              adjustCamera={2}
            >
              <Cup
                colorMap={colorMap}
                normalMap={normalMap}
                displacementMap={displacementMap}
                aoMap={aoMap}
                roughnessMap={roughnessMap}
                metalnessMap={metalnessMap}
                color={color}
              />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <h1 className='website__title'>Pascale Schmidt - Ceramic Configurator</h1>
      <div className='ui'>
        <div className='sidebar'>
          <div className='sidebar__header'>
            <h2 className='sidebar__headline'>Configuration Parameters</h2>
          </div>
          <div className='sidebar__body'>
            <div className='sidebar__item'>
              Hier kommen die ausgewählten Informationen hin
              {/* <div className='card-product'>
                <h4>Selected Product</h4>
                <div className='card-product__wrapper'>
                  <div className='color-box-group'>
                    <div className='color-box color-box--large'></div>
                  </div>
                  <div className='card-product__body'>
                    <span className='card-product__title'>Product Title</span>
                    <span className='card-product__description'>
                      30cm x 20cm x 10cm
                    </span>
                    <Button label={'Change'} link />
                  </div>
                </div>
              </div> */}
            </div>
            <div className='sidebar__header'>
              <h3 className='sidebar__headline'>Type of Clay</h3>
              <span className='sidebar__selection'>Basic beige clay</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                <ColorRadioItem
                  name='clay'
                  value='clay'
                  image='/glazes/glazes_clay_beige_plain.svg'
                  alt='Option 1'
                  isChecked={true}
                />
                <ColorRadioItem
                  name='clay'
                  value='clay-spreckled'
                  image='/glazes/glazes_clay_beige_spreckle.svg'
                  alt='Option 2'
                  // onClick={() => handleGlazeColor('green')}
                />
              </ColorRadio>
            </div>
            <div className='sidebar__header'>
              <h3 className='sidebar__headline'>Type of Glaze</h3>
              <span className='sidebar__selection'>Botz Transparent</span>
            </div>
            <div className='sidebar__item'>
              <form name='glazeParams' id='glazeParams'>
                {/* <h5>Shiny</h5> */}
                <ColorRadio>
                  <ColorRadioItem
                    name='glaze'
                    value='transparent'
                    image='/glazes/glazes_glaze_matt_transparent.svg'
                    alt='Option 1'
                    isChecked={true}
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='blue'
                    image='/glazes/glazes_glaze_shiny_blue.svg'
                    alt='Option 2'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='lightblue'
                    image='/glazes/glazes_glaze_shiny_blue_light.svg'
                    alt='Option 3'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='chartreuse'
                    image='/glazes/glazes_glaze_shiny_chartreuse.svg'
                    alt='Option 4'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='green'
                    image='/glazes/glazes_glaze_shiny_green.svg'
                    alt='Option 5'
                  />
                </ColorRadio>

                {/* <h5>Matt</h5> */}
                <ColorRadio>
                  <ColorRadioItem
                    name='glaze'
                    value='mblack'
                    image='/glazes/glazes_glaze_matt_black.svg'
                    alt='Option 2'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='mblue'
                    image='/glazes/glazes_glaze_matt_blue.svg'
                    alt='Option 3'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='mblueintense'
                    image='/glazes/glazes_glaze_matt_blue_intense.svg'
                    alt='Option 4'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='mgreen'
                    image='/glazes/glazes_glaze_matt_green.svg'
                    alt='Option 5'
                  />
                  <ColorRadioItem
                    name='glaze'
                    value='mpink'
                    image='/glazes/glazes_glaze_matt_pink.svg'
                    alt='Option 6'
                  />
                </ColorRadio>
              </form>
            </div>
            <div className='sidebar__header'>
              <h3 className='sidebar__headline'>Parts of Glazing</h3>
              <span className='sidebar__selection'>2/3</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                <ColorRadioItem
                  name='glaze_parts'
                  value='full'
                  image='/glaze_parts_full.svg'
                  alt='Option 7'
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='twothrid'
                  image='/glaze_parts_2:3.svg'
                  alt='Option 7'
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='half'
                  image='/glaze_parts_half.svg'
                  alt='Option 7'
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='inner'
                  image='/glaze_parts_inner.svg'
                  alt='Option 7'
                />
              </ColorRadio>
            </div>
          </div>
          <div className='sidebar__footer'>
            <Button
              label={'Save as image'}
              // onClick={() =>
              //   cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true)
              // }
            />
            <Button
              label={'View in VR'}
              outline
              // onClick={() => cameraControlsRef.current?.reset(true)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Configurator
