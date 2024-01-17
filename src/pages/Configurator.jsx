import {
  Stage,
  PresentationControls,
  Environment,
  useProgress,
} from '@react-three/drei'
import { Canvas} from '@react-three/fiber'

import { Suspense, useState} from 'react'

import { Cup } from '../components/Cup'
import { Bowl } from '../components/Bowl'

import Button from '../components/Button'
import ColorRadio from '../components/ColorRadio/ColorRadio'
import LoadingScreen from '../components/LoadingScreen'
import Selection from '../components/Selection/Selection'

import shinyGlazes from '../data/shinyGlazes'
import mattGlazes from '../data/mattGlazes'
import clays from '../data/clays'
import parts from '../data/parts'

import {GLAZE_PROPERTY_FOODSAFE, MODEL_DIMENSIONS, GLAZE_PROPERTY_CRACKLING, GLAZE_PROPERTY_TENDSTORUN}  from '../data/data'


function DownloadCanvasAsImage() {
  let downloadLink = document.createElement('a')
  downloadLink.setAttribute('download', 'MyConfiguration.png')
  let screen = document.getElementById('canvas')?.childNodes[0].childNodes[0]

  let dataURL = screen.toDataURL('image/png')
  let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')
  downloadLink.setAttribute('href', url)
  downloadLink.click()
}

const Configurator = () => {
  const [glaze, setGlaze] = useState('No glaze selected')
  const [clay, setClay] = useState('Basic Beige')
  const [part, setPart] = useState('Completely glazed')
  const [start, setStart] = useState(false) // für Loading Screen
  const [model, setModel] = useState('Cup')
  const [foodsafe, setFoodsafe] = useState(false)
  const [crackling, setCrackling] = useState(false)
  const [tendsToRun, setTendsToRun] = useState(false)
  const { progress } = useProgress()

  // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

  const onGlazeOptionChange = (e) => {
    handleProperties(e.target.value)
    setGlaze(e.target.value)
  }

  const onClayOptionChange = (e) => {
    setClay(e.target.value)
  }

  const onPartOptionChange = (e) => {
    setPart(e.target.value)
    if(part === 'No glaze selected'){
      setGlaze('')
    }
  }

  const onModelChange = (model) => {
    setModel(model)
  }

  const handleProperties = (value) => {
    setFoodsafe(GLAZE_PROPERTY_FOODSAFE[value])
    setCrackling(GLAZE_PROPERTY_CRACKLING[value])
    setTendsToRun(GLAZE_PROPERTY_TENDSTORUN[value])
  }

  if(isFirefox){
    return (<div className='error__screen'><div className='error__image'> <svg><use href={`/sprite.svg#smiley-sad`} xlinkHref={`/sprite.svg#smiley-sad`}></use></svg></div>Sorry, but the Configurator is currently not working in Firefox, please use a different browser (e.g. Chrome, Safari, Opera, Edge, ...)</div>)
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
            zoom={0.7}
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
              adjustCamera={model === 'Cup' ? 1.5 : 1}
            >
              <Environment
                background={false} // Whether to affect scene.background
                files={'lebombo_1k.hdr'}
                path={'/static/'}
              />
              {model === 'Cup' && (
                <Cup clay={clay} glaze={glaze} glazePart={part} />
              )}
              {model === 'Bowl' && (
                <Bowl clay={clay} glaze={glaze} glazePart={part} />
              )}
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
      {!start && <LoadingScreen started={start} onStarted={() => setStart(true)} />}
      {progress < 100 && <div className='loader-wrapper'><div className='loader'></div></div>}
      <Selection headline='My Configuration'>
        <Selection.Item icon='cup'>{model}</Selection.Item>
        <Selection.Item icon='ruler'>{MODEL_DIMENSIONS[model]}</Selection.Item>
        <Selection.Space />
        {glaze !== 'No glaze selected' && 
          <>
            <Selection.Item icon='clay'>{clay}</Selection.Item>
            <Selection.Item icon='brush'>{glaze}</Selection.Item>
            <Selection.Space />
            <Selection.Item icon='fire'>Oxidative</Selection.Item>
            <Selection.Item icon='temperature'>1250°C</Selection.Item>
            <Selection.Space />
            {foodsafe && <Selection.Item icon='foodsafe'>Food safe</Selection.Item>}
            {crackling && <Selection.Item icon='cracks'>Crackling</Selection.Item>}
            {tendsToRun && <Selection.Item icon='waterdrop'>Tends to run</Selection.Item>}
          </>
        }
      </Selection>
      {start && <>
      <h1 className='title'>PascaleSchmidtCeramics - Configurator</h1>
      <div className='ui'>
        <div className='sidebar'>
          <div className='sidebar__body'>
            <div className='sidebar__headline-wrapper'>
              <h2 className='sidebar__headline'>Product</h2>
              <span className='sidebar__selection'>{model}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                  <ColorRadio.Item
                    name='model'
                    value='Cup'
                    image='/static/Cup.webp'
                    alt='Cup'
                    tooltip='Cup'
                    defaultChecked={model === 'Cup'}
                    onClick={() => onModelChange('Cup')}
                  />
                <ColorRadio.Item
                  name='model'
                  value='Bowl'
                  image='/static/Bowl.webp'
                  alt='Bowl'
                  tooltip='Bowl'
                  defaultChecked={model === 'Bowl'}
                  onClick={() => onModelChange('Bowl')}
                />
              </ColorRadio>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h2 className='sidebar__headline'>Type of Clay</h2>
              <span className='sidebar__selection'>{clay}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                {clays.map((clayItem) => {
                  return (
                    <ColorRadio.Item
                      key={clayItem._id}
                      name='clayItem'
                      value={clayItem.value}
                      image={clayItem.src}
                      tooltip={clayItem.alt}
                      alt={clayItem.alt}
                      defaultChecked={clay === clayItem.value}
                      onClick={onClayOptionChange}
                    />
                  )
                })}
              </ColorRadio>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h2 className='sidebar__headline'>Type of Glaze</h2>
              <span className='sidebar__selection'>{glaze}</span>
            </div>
            <div className='sidebar__item'>
              <form name='glazeParams' id='glazeParams'>
                <ColorRadio>
                  {shinyGlazes.map((glazeItem, index) => (
                    <ColorRadio.Item
                      key={index}
                      name='glaze'
                      value={glazeItem.value}
                      tooltip={glazeItem.alt}
                      image={glazeItem.src}
                      alt={glazeItem.alt}
                      defaultChecked={glaze === glazeItem.value}
                      onClick={onGlazeOptionChange}
                    />
                  ))}
                </ColorRadio>
     
                <ColorRadio>
                  {mattGlazes.map((glazeItem, index) => (
                        <ColorRadio.Item
                          key={index}
                          name='glaze'
                          value={glazeItem.value}
                          image={glazeItem.src}
                          alt={glazeItem.alt}
                          tooltip={glazeItem.alt}
                          onClick={onGlazeOptionChange}
                        />
                  ))}
                </ColorRadio>
              </form>
            </div>
            <div className='sidebar__headline-wrapper'>
              <h2 className='sidebar__headline'>Parts of Glazing</h2>
              <span className='sidebar__selection'>{part}</span>
            </div>
            <div className='sidebar__item'>
              <ColorRadio>
                {parts.map((partsItem, index) => (
                  <ColorRadio.Item
                    key={index}
                    name='parts'
                    value={partsItem.value}
                    image={partsItem.src}
                    alt={partsItem.alt}
                    tooltip={partsItem.alt}
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
      </div></>}
    </>
      
  )
}

export default Configurator
