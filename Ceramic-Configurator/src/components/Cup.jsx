import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { LinearEncoding } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const Cup = ({
  colorMap,
  normalMap,
  displacementMap,
  aoMap,
  roughnessMap,
  metalnessMap,
  selectedMaterial,
}) => {
  // const gltf = useLoader(GLTFLoader, './models/Cup.gltf')
  const { nodes } = useGLTF('./models/Cup-transformed.glb')
  const ref = useRef()

  const basicBeige = useTexture({
    colorMap: '/textures/clay_basic/clay_floor_001_diff_1k.jpg',
    normalMap: './textures/clay_basic/clay_floor_001_nor_gl_1k.jpg',
    displacementMap: './textures/clay_basic/clay_floor_001_disp_1k.jpg',
    aoMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    roughnessMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    metalnessMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  })

  const spreckledBeige = useTexture({
    colorMap: '/textures/clay_spreckled/gravel_concrete_diff_1k.jpg',
    normalMap: './textures/clay_spreckled/gravel_concrete_nor_gl_1k.jpg',
    displacementMap: './textures/clay_spreckled/gravel_concrete_disp_1k.jpg',
    aoMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
    roughnessMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
    metalnessMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
  })

  const [props, setProps] = useState(basicBeige)

  useEffect(() => {
    switch (selectedMaterial) {
      case 'Spreckled Beige':
        setProps(spreckledBeige)
        ref.current.material.needsUpdate = true
        break
      case 'Basic Beige':
        setProps(basicBeige)
        ref.current.material.needsUpdate = true
        break
      default:
        null
    }
  }, [selectedMaterial])

  return (
    <>
      <group dispose={null}>
        <mesh geometry={nodes.Cup.geometry} castShadow ref={ref}>
          <meshStandardMaterial
            map={props.colorMap}
            normalMap={props.normalMap}
            displacementMap={displacementMap}
            aoMap={props.aoMap}
            roughnessMap={props.roughnessMap}
            metalnessMap={props.metalnessMap}
            normalMapType={LinearEncoding}
          />
        </mesh>
      </group>
    </>
  )
}
useGLTF.preload('./models/Cup-transformed.glb')

export default Cup
