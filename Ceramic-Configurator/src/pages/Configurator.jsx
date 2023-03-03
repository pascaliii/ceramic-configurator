import { Stage, PresentationControls } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import Button from '../components/Button'
import ColorRadio from '../components/ColorRadio/ColorRadio'
import ColorRadioItem from '../components/ColorRadio/ColorRadioItem'

const Configurator = () => {
  return (
    <>
      <Canvas className='canvas'>
        <PresentationControls
          speed={1.5}
          global
          zoom={0.7}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage
            intensity={1.5}
            environment='city'
            shadows={{
              type: 'accumulative',
              color: 'skyblue',
              colorBlend: 2,
              opacity: 2,
            }}
            adjustCamera={2}
          >
            <mesh>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          </Stage>
        </PresentationControls>
      </Canvas>
      <div className='ui'>
        <div className='sidebar'>
          <div className='sidebar__header'>
            <h2 className='sidebar__header-title'>Configuration Parameters</h2>
          </div>
          <div className='sidebar__body'>
            <div className='sidebar__item'>
              <div className='card-product'>
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
              </div>
            </div>
            <div className='sidebar__item'>
              <h4>Type of Clay</h4>
              <ColorRadio>
                <ColorRadioItem
                  name='clay'
                  value='clay'
                  image='/glazes/glazes_clay_beige_plain.svg'
                  alt='Option 1'
                />
                <ColorRadioItem
                  name='clay'
                  value='clay-spreckled'
                  image='/glazes/glazes_clay_beige_spreckle.svg'
                  alt='Option 2'
                />
              </ColorRadio>
            </div>
            <div className='sidebar__item'>
              <form name='glazeParams' id='glazeParams'>
                <h4>Type of Glaze</h4>
                <h5>Shiny</h5>
                <ColorRadio>
                  <ColorRadioItem
                    name='glaze'
                    value='transparent'
                    image='/glazes/glazes_glaze_matt_transparent.svg'
                    alt='Option 1'
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

                <h5>Matt</h5>
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

            <div className='sidebar__item'>
              <h4>Parts of Glazing</h4>
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
            <div className='sidebar__item'>
              <Button label={'Save as image'} />
              <Button label={'View in VR'} outline />
              <Button label={'Back'} link />
            </div>
          </div>
          {/* <div className='sidebar__footer'>
           <Button label={'Save as image'} />
              <Button label={'View in VR'} outline />
              <Button label={'Back'} link />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Configurator
