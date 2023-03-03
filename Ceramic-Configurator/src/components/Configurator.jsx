import { Stage, PresentationControls } from '@react-three/drei'

const Configurator = () => {
  return (
    <>
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
    </>
  )
}

export default Configurator
