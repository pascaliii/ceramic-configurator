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
import { Vector3, MathUtils } from 'three'

import { Suspense, useState, useRef } from 'react'

import Button from '../components/Button'
import ColorRadio from '../components/ColorRadio/ColorRadio'
import ColorRadioItem from '../components/ColorRadio/ColorRadioItem'
import Cup from '../components/Cup'
import LoadingScreen from '../components/LoadingScreen'

import shinyGlazes from '../data/shinyGlazes.json'
import mattGlazes from '../data/mattGlazes.json'
import clays from '../data/clays.json'

const Configurator = () => {
  // const texture1 = [
  //   '/textures/clay_basic/clay_floor_001_diff_1k.jpg',
  //   './textures/clay_basic/clay_floor_001_nor_gl_1k.jpg',
  //   './textures/clay_basic/clay_floor_001_disp_1k.jpg',
  //   // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  //   // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  //   // './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  // ]

  const [selectedMaterial, setSelectedMaterial] = useState('default')

  const [glaze, setGlaze] = useState('Botz Transparent')
  const [clay, setClay] = useState('Basic Beige')
  const [start, setStart] = useState(false) // für Loading Screen

  const onGlazeOptionChange = (e) => {
    setGlaze(e.target.value)
    setSelectedMaterial(clay)
  }

  const onClayOptionChange = (e) => {
    setSelectedMaterial(e.target.value)
    setClay(e.target.value)
    console.log(clay)
  }

  return (
    <>
      <Canvas className='canvas' shadows>
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            rotatio={[]}
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage
              preset='soft'
              intensity={0.2}
              environment={null}
              shadows={{
                type: 'accumulative',
                color: '#f3f5f9',
                colorblend: 0.5,
                opacity: 0.5,
              }}
              adjustCamera={2}
            >
              <Environment
                background={false} // Whether to affect scene.background
                files={'lebombo_1k.hdr'}
                path={'/static/'}
              />
              <Cup
                // colorMap={props.colorMap}
                // normalMap={props.normalMap}
                // displacementMap={props.displacementMap}
                // aoMap={props.aoMap}
                // roughnessMap={props.roughnessMap}
                // metalnessMap={props.metalnessMap}
                selectedMaterial={selectedMaterial}
              />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
      {/* <LoadingScreen started={start} onStarted={() => setStart(true)} /> */}
      <h1 className='title'>Pascale Schmidt - Ceramic Configurator</h1>
      <div className='ui'>
        <div className='sidebar'>
          {/* <div className='sidebar__header'>
            <h2 className='sidebar__headline'>Configuration Parameters</h2>
          </div> */}
          <div className='sidebar__body'>
            <div className='sidebar__headline-wrapper'>
              <h2 className='sidebar__headline'>Configuration Parameters</h2>
            </div>
            <div className='sidebar__item'>
              Hier kommen die ausgewählten Informationen hin
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Type of Clay</h3>
              <span className='sidebar__selection'>{clay}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                {clays.map((clay, index) => (
                  <ColorRadioItem
                    key={index}
                    name='clay'
                    value={clay.value}
                    image={clay.src}
                    alt={clay.alt}
                    checked={clay === clay.value}
                    onClick={onClayOptionChange}
                    // onClick={() => handleGlazeColor('green')}
                  />
                ))}
              </ColorRadio>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Type of Glaze</h3>
              <span className='sidebar__selection'>{glaze}</span>
            </div>
            <div className='sidebar__item'>
              <form name='glazeParams' id='glazeParams'>
                <ColorRadio>
                  {shinyGlazes.map((glaze, index) => (
                    <ColorRadioItem
                      key={index}
                      name='glaze'
                      value={glaze.value}
                      image={glaze.src}
                      alt={glaze.alt}
                      checked={glaze === glaze.value}
                      onClick={onGlazeOptionChange}
                    />
                  ))}
                </ColorRadio>
                <ColorRadio>
                  {mattGlazes.map((glaze, index) => (
                    <ColorRadioItem
                      key={index}
                      name='glaze'
                      value={glaze.value}
                      image={glaze.src}
                      alt={glaze.alt}
                      checked={glaze === glaze.value}
                      onClick={onGlazeOptionChange}
                    />
                  ))}
                </ColorRadio>
              </form>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h3 className='sidebar__headline'>Parts of Glazing</h3>
              <span className='sidebar__selection'>2/3</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                <ColorRadioItem
                  name='glaze_parts'
                  value='full'
                  image='/glaze_parts/glaze_parts_full.svg'
                  alt='Option 7'
                  isChecked={true}
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='twothrid'
                  image='/glaze_parts/glaze_parts_twothird.svg'
                  alt='Option 7'
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='half'
                  image='/glaze_parts/glaze_parts_half.svg'
                  alt='Option 7'
                />
                <ColorRadioItem
                  name='glaze_parts'
                  value='inner'
                  image='/glaze_parts/glaze_parts_onethird.svg'
                  alt='Option 7'
                />
              </ColorRadio>
            </div>
          </div>
          <div className='sidebar__footer'>
            <Button label={'Save as image'} />
            <Button label={'View in VR'} outline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Configurator
