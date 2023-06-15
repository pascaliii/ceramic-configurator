import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { LinearEncoding } from 'three'
import * as THREE from 'three'

export const Cup = ({ clay, glaze }) => {
  const { nodes } = useGLTF('./models/Model_Cup-transformed.glb')
  const ref = useRef()

  const spreckledBeige = useTexture({
    colorMap: '/textures/clay_spreckled/gravel_concrete_diff_1k.jpg',
    normalMap: './textures/clay_spreckled/gravel_concrete_nor_gl_1k.jpg',
    displacementMap: './textures/clay_spreckled/gravel_concrete_disp_1k.jpg',
    aoMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
    roughnessMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
    metalnessMap: './textures/clay_spreckled/gravel_concrete_ao_1k.jpg',
  })

  const basicBeige = useTexture({
    colorMap: '/textures/clay_basic/clay_floor_001_diff_1k.jpg',
    normalMap: './textures/clay_basic/clay_floor_001_nor_gl_1k.jpg',
    displacementMap: './textures/clay_basic/clay_floor_001_disp_1k.jpg',
    aoMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    roughnessMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
    metalnessMap: './textures/clay_basic/clay_floor_001_arm_1k.jpg',
  })

  const SRosaFelsB = useTexture({
    colorMap: 'textures/s_rosa_fels_b/S_Rosa_Fels_B_BaseColor.png',
    normalMap: 'textures/s_rosa_fels_b/S_Rosa_Fels_B_Normal.png',
    displacementMap: 'textures/s_rosa_fels_b/S_Rosa_Fels_B_Height.png',
    aoMap: 'textures/s_rosa_fels_b/S_Rosa_Fels_B_AmbientOcclusion.png',
    roughnessMap: 'textures/s_rosa_fels_b/S_Rosa_Fels_B_Roughness.png',
  })

  const SPatinaB = useTexture({
    colorMap: 'textures/s_patina_b/S_Patina_B_BaseColor.png',
    normalMap: 'textures/s_patina_b/S_Patina_B_Normal.png',
    displacementMap: 'textures/s_patina_b/S_Patina_B_Height.png',
    aoMap: 'textures/s_patina_b/S_Patina_B_AmbientOcclusion.png',
    roughnessMap: 'textures/s_patina_b/S_Patina_B_Roughness.png',
  })

  const SHellblauCJ = useTexture({
    colorMap: 'textures/s_hellblau_cj/S_Hellblau_CJ_BaseColor.png',
    normalMap: 'textures/s_hellblau_cj/S_Hellblau_CJ_Normal.png',
    displacementMap: 'textures/s_hellblau_cj/S_Hellblau_CJ_Height.png',
    aoMap: 'textures/s_hellblau_cj/S_Hellblau_CJ_AmbientOcclusion.png',
    roughnessMap: 'textures/s_hellblau_cj/S_Hellblau_CJ_Roughness.png',
  })

  const createNewMaterial = () => {
    let materialTexture

    switch (clay) {
      case 'Basic Beige':
        materialTexture = basicBeige
        break
      case 'Spreckled Beige':
        materialTexture = spreckledBeige
        break
      default:
        break
    }

    switch (glaze) {
      case '1253a Hellblau (CJ)':
        materialTexture = SHellblauCJ
        break
      case '9867 Patina (B)':
        materialTexture = SPatinaB
        break
      case '9864 Rosa Fels (B)':
        materialTexture = SRosaFelsB
        break
      default:
        break
    }

    const newMaterial = new THREE.MeshStandardMaterial({
      // blending: THREE.NoBlending,
      map: materialTexture.colorMap,
      opacity: 1,
      normalMap: materialTexture.normalMap,
      displacementMap: materialTexture.displacementMap,
      displacementScale: 0.001,
      aoMap: materialTexture.aoMap,
      roughnessMap: materialTexture.roughnessMap,
      // metalnessMap: materialTexture.metalnessMap,
      // normalMapType: LinearEncoding,
    })

    // materialTexture.colorMap.repeat.set(1, 1)
    // materialTexture.normalMap.repeat.set(1, 1)
    // // materialTexture.displacementMap.repeat.set(1, 1)
    // materialTexture.aoMap.repeat.set(1, 1)
    // materialTexture.roughnessMap.repeat.set(1, 1)

    // materialTexture.colorMap.wrapS = materialTexture.colorMap.wrapT =
    //   THREE.RepeatWrapping
    // materialTexture.normalMap.wrapS = materialTexture.normalMap.wrapT =
    //   THREE.RepeatWrapping
    // // materialTexture.displacementMap.wrapS =
    // //   materialTexture.displacementMap.wrapT = THREE.RepeatWrapping
    // materialTexture.aoMap.wrapS = materialTexture.aoMap.wrapT =
    //   THREE.RepeatWrapping
    // materialTexture.roughnessMap.wrapS = materialTexture.roughnessMap.wrapT =
    //   THREE.RepeatWrapping

    return newMaterial
  }

  useEffect(() => {
    if (clay) {
      const material = createNewMaterial()

      // console.log(material)

      // console.log(ref.current.material)

      ref.current.material.map = material.map
      ref.current.material.normalMap = material.normalMap
      ref.current.material.displacementMap = material.displacementMap
      ref.current.material.aoMap = material.aoMap
      ref.current.material.roughnessMap = material.roughnessMap
    }
  }, [clay])

  /*useEffect(() => {
    switch (glaze) {
      case 'Keine Glasur':
        setMaterial(basicBeige)
        ref.current.material.needsUpdate = true
        break
      case '9864 Rosa Fels (B)':
        setMaterial(SRosaFelsB)
        ref.current.material.needsUpdate = true
        break
      case '9867 Patina (B)':
        setMaterial(SPatinaB)
        ref.current.material.needsUpdate = true
        break
      case '1253a Hellblau (CJ)':
        setMaterial(SHellblauCJ)
        ref.current.material.needsUpdate = true
        break
      default:
        null
    }
  }, [glaze])*/

  return (
    <>
      <group>
        <mesh
          geometry={nodes.Cylinder.geometry}
          castShadow
          ref={ref}
          material={createNewMaterial()}
        />
        {/* <meshStandardMaterial
            map={material.colorMap}
            opacity={1}
            normalMap={material.normalMap}
            displacementMap={material.displacementMap}
            displacementScale={0.001}
            aoMap={material.aoMap}
            roughnessMap={material.roughnessMap}
            // metalnessMap={material.metalnessMap}
            normalMapType={LinearEncoding}
          /> */}
      </group>
    </>
  )
}
useGLTF.preload('./models/Model_Cup-transformed.glb')

export default Cup
