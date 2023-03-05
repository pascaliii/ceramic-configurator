import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
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
}) => {
  // const gltf = useLoader(GLTFLoader, './models/Cup.gltf')
  const { nodes } = useGLTF('./models/Cup-transformed.glb')

  // console.log(gltf)
  return (
    <>
      <group dispose={null}>
        <mesh geometry={nodes.Cup.geometry}>
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            // displacementMap={displacementMap}
            aoMap={aoMap}
            roughnessMap={roughnessMap}
            metalnessMap={metalnessMap}
            normalMapType={LinearEncoding}
          />
        </mesh>
      </group>
    </>
  )
}
useGLTF.preload('./models/Cup-transformed.glb')

export default Cup
