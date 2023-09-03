import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { LinearEncoding } from 'three'
import * as THREE from 'three'

export const CupOld = ({ clay, glaze }) => {
  const { nodes } = useGLTF('./models/Model_Cup-transformed.glb')
  const ref = useRef()

 const spreckledBeige = useTexture({
   // colorMap: '/textures/clay_basic/Clay_Beige_BaseColor.png',
   // normalMap: './textures/clay_basic/Clay_Beige_Normal.png',
   // displacementMap: './textures/clay_basic/Clay_Beige_Height.png',
   // aoMap: './textures/clay_basic/Clay_Beige_AmbientOcclusion.png',
   // roughnessMap: './textures/clay_basic/Clay_Beige_Roughness.png',
   colorMap: '/textures/clay_spreckled/Clay_Spreckled_BaseColor.png',
   normalMap: './textures/clay_spreckled/Clay_Spreckled_Normal.png',
   displacementMap: './textures/clay_spreckled/Clay_Spreckled_Height.png',
   aoMap: './textures/clay_spreckled/Clay_Spreckled_AmbientOcclusion.png',
   roughnessMap: './textures/clay_spreckled/Clay_Spreckled_Roughness.png',
 })

 const basicBeige = useTexture({
   // colorMap: '/textures/clay_spreckled/Clay_Spreckled_BaseColor.png',
   // normalMap: './textures/clay_spreckled/Clay_Spreckled_Normal.png',
   // displacementMap: './textures/clay_spreckled/Clay_Spreckled_Height.png',
   // aoMap: './textures/clay_spreckled/Clay_Spreckled_AmbientOcclusion.png',
   // roughnessMap: './textures/clay_spreckled/Clay_Spreckled_Roughness.png',
   colorMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_BaseColor.png',
   normalMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Normal.png',
   displacementMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Height.png',
   aoMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_AmbientOcclusion.png',
   roughnessMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Roughness.png',
 })

 const SRosaFelsB = useTexture({
   colorMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_BaseColor.png',
   normalMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Normal.png',
   displacementMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Height.png',
   aoMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_AmbientOcclusion.png',
   roughnessMap: 'textures/s_rosa_fels_b/B_Rosa_Fels_Roughness.png',
 })

 const SPatinaB = useTexture({
   colorMap: 'textures/s_patina_b/B_Patina_BaseColor.png',
   normalMap: 'textures/s_patina_b/B_Patina_Normal.png',
   displacementMap: 'textures/s_patina_b/B_Patina_Height.png',
   aoMap: 'textures/s_patina_b/B_Patina_AmbientOcclusion.png',
   roughnessMap: 'textures/s_patina_b/B_Patina_Roughness.png',
 })

 const SHellblauCJ = useTexture({
   colorMap: 'textures/s_hellblau_cj/CJ_Hellblau_BaseColor.png',
   normalMap: 'textures/s_hellblau_cj/CJ_Hellblau_Normal.png',
   displacementMap: 'textures/s_hellblau_cj/CJ_Hellblau_Height.png',
   aoMap: 'textures/s_hellblau_cj/CJ_Hellblau_AmbientOcclusion.png',
   roughnessMap: 'textures/s_hellblau_cj/CJ_Hellblau_Roughness.png',
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
      // clearcoat: 1,
    })

    // Texture Repeat nicht mehr notwenddig, wenn in Sampler erhöht
    materialTexture.colorMap.repeat.set(1, 1)
    materialTexture.normalMap.repeat.set(1, 1)
    // materialTexture.displacementMap.repeat.set(1, 1)
    materialTexture.aoMap.repeat.set(1, 1)
    materialTexture.roughnessMap.repeat.set(1, 1)

    materialTexture.colorMap.wrapS = materialTexture.colorMap.wrapT =
      THREE.RepeatWrapping
    materialTexture.normalMap.wrapS = materialTexture.normalMap.wrapT =
      THREE.RepeatWrapping
    // materialTexture.displacementMap.wrapS =
    //   materialTexture.displacementMap.wrapT = THREE.RepeatWrapping
    materialTexture.aoMap.wrapS = materialTexture.aoMap.wrapT =
      THREE.RepeatWrapping
    materialTexture.roughnessMap.wrapS = materialTexture.roughnessMap.wrapT =
      THREE.RepeatWrapping

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

export default CupOld
