import './App.scss'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

import Configurator from './pages/Configurator'

function App() {
  return (
    <div className='app'>
      <Configurator />
    </div>
  )
}

export default App
