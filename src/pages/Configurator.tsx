import {
  Stage,
  PresentationControls,
  Environment,
  useProgress,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback } from 'react'

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

import {
  GLAZE_PROPERTY_FOODSAFE,
  MODEL_DIMENSIONS,
  GLAZE_PROPERTY_CRACKLING,
  GLAZE_PROPERTY_TENDSTORUN,
} from '../data/data'

import type { ModelName, GlazePart } from '../types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const NO_GLAZE = 'No glaze selected'
const DEFAULT_CLAY = 'Basic Beige'
const DEFAULT_PART: GlazePart = 'Completely glazed'

function downloadCanvasAsImage() {
  const screen = document.getElementById('canvas')
    ?.childNodes[0]
    ?.childNodes[0] as HTMLCanvasElement | undefined

  if (!screen) return

  const dataURL = screen.toDataURL('image/png')
  const url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream')

  const link = document.createElement('a')
  link.setAttribute('download', 'MyConfiguration.png')
  link.setAttribute('href', url)
  link.click()
}

function isFirefox(): boolean {
  return typeof (window as Window & { InstallTrigger?: unknown }).InstallTrigger !== 'undefined'
}

// ─── Component ───────────────────────────────────────────────────────────────

const Configurator = () => {
  const [glaze, setGlaze] = useState<string>(NO_GLAZE)
  const [clay, setClay] = useState<string>(DEFAULT_CLAY)
  const [part, setPart] = useState<GlazePart>(DEFAULT_PART)
  const [started, setStarted] = useState<boolean>(false)
  const [model, setModel] = useState<ModelName>('Cup')
  const [foodsafe, setFoodsafe] = useState<boolean>(false)
  const [crackling, setCrackling] = useState<boolean>(false)
  const [tendsToRun, setTendsToRun] = useState<boolean>(false)

  const { progress } = useProgress()

  const handleProperties = useCallback((value: string) => {
    setFoodsafe(GLAZE_PROPERTY_FOODSAFE[value] ?? false)
    setCrackling(GLAZE_PROPERTY_CRACKLING[value] ?? false)
    setTendsToRun(GLAZE_PROPERTY_TENDSTORUN[value] ?? false)
  }, [])

  const onGlazeOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      handleProperties(value)
      setGlaze(value)
    },
    [handleProperties],
  )

  const onClayOptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setClay(e.target.value)
  }, [])

  const onPartOptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as GlazePart
    setPart(value)
    if (value === 'No glaze selected') {
      setGlaze(NO_GLAZE)
    }
  }, [])

  const onModelChange = useCallback((nextModel: ModelName) => {
    setModel(nextModel)
  }, [])

  if (isFirefox()) {
    return (
      <div className='error__screen'>
        <div className='error__image'>
          <svg>
            <use href='/sprite.svg#smiley-sad' />
          </svg>
        </div>
        Sorry, but the Configurator is currently not working in Firefox, please use a different
        browser (e.g. Chrome, Safari, Opera, Edge, ...)
      </div>
    )
  }

  const glazeSelected = glaze !== NO_GLAZE

  return (
    <>
      <Canvas
        className='canvas'
        shadows
        id='canvas'
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <PresentationControls global zoom={0.7} polar={[-1, Math.PI / 2]}>
            <Stage
              preset='soft'
              intensity={0}
              environment={null}
              shadows={false}
              adjustCamera={model === 'Cup' ? 1.5 : 1}
            >
              <Environment background={false} files='lebombo_1k.hdr' path='/static/' />
              {model === 'Cup' && <Cup clay={clay} glaze={glaze} glazePart={part} />}
              {model === 'Bowl' && <Bowl clay={clay} glaze={glaze} glazePart={part} />}
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>

      {!started && (
        <LoadingScreen started={started} onStarted={() => setStarted(true)} />
      )}

      {progress < 100 && (
        <div className='loader-wrapper'>
          <div className='loader' />
        </div>
      )}

      <Selection headline='My Configuration'>
        <Selection.Item icon='cup'>{model}</Selection.Item>
        <Selection.Item icon='ruler'>{MODEL_DIMENSIONS[model]}</Selection.Item>
        <Selection.Space />
        {glazeSelected && (
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
        )}
      </Selection>

      {started && (
        <>
          <h1 className='title'>PascaleSchmidtCeramics - Configurator</h1>
          <div className='ui'>
            <div className='sidebar'>
              <div className='sidebar__body'>
                {/* ── Product ── */}
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

                {/* ── Clay ── */}
                <div className='sidebar__headline-wrapper'>
                  <h2 className='sidebar__headline'>Type of Clay</h2>
                  <span className='sidebar__selection'>{clay}</span>
                </div>
                <div className='sidebar__item'>
                  <ColorRadio>
                    {clays.map((clayItem) => (
                      <ColorRadio.Item
                        key={clayItem._id}
                        name='clayItem'
                        value={clayItem.value}
                        image={clayItem.src}
                        tooltip={clayItem.alt}
                        alt={clayItem.alt}
                        defaultChecked={clay === clayItem.value}
                        onChange={onClayOptionChange}
                      />
                    ))}
                  </ColorRadio>
                </div>

                {/* ── Glaze ── */}
                <div className='sidebar__headline-wrapper'>
                  <h2 className='sidebar__headline'>Type of Glaze</h2>
                  <span className='sidebar__selection'>{glaze}</span>
                </div>
                <div className='sidebar__item'>
                  <form name='glazeParams' id='glazeParams'>
                    <ColorRadio>
                      {shinyGlazes.map((glazeItem) => (
                        <ColorRadio.Item
                          key={glazeItem._id}
                          name='glaze'
                          value={glazeItem.value}
                          tooltip={glazeItem.alt}
                          image={glazeItem.src}
                          alt={glazeItem.alt}
                          defaultChecked={glaze === glazeItem.value}
                          onChange={onGlazeOptionChange}
                        />
                      ))}
                    </ColorRadio>
                    <ColorRadio>
                      {mattGlazes.map((glazeItem) => (
                        <ColorRadio.Item
                          key={glazeItem._id}
                          name='glaze'
                          value={glazeItem.value}
                          image={glazeItem.src}
                          alt={glazeItem.alt}
                          tooltip={glazeItem.alt}
                          onChange={onGlazeOptionChange}
                        />
                      ))}
                    </ColorRadio>
                  </form>
                </div>

                {/* ── Parts ── */}
                <div className='sidebar__headline-wrapper'>
                  <h2 className='sidebar__headline'>Parts of Glazing</h2>
                  <span className='sidebar__selection'>{part}</span>
                </div>
                <div className='sidebar__item'>
                  <ColorRadio>
                    {parts.map((partsItem) => (
                      <ColorRadio.Item
                        key={partsItem._id}
                        name='parts'
                        value={partsItem.value}
                        image={partsItem.src}
                        alt={partsItem.alt}
                        tooltip={partsItem.alt}
                        defaultChecked={part === partsItem.value}
                        onChange={onPartOptionChange}
                      />
                    ))}
                  </ColorRadio>
                </div>
              </div>

              <div className='sidebar__footer'>
                <Button label='Save as image' onClick={downloadCanvasAsImage} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Configurator
