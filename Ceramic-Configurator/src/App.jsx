import './App.css'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

import Configurator from './components/Configurator'

function App() {
  return (
    <div className='App'>
      <Canvas className='canvas'>
        <Configurator />
      </Canvas>
    </div>
  )
}

export default App
