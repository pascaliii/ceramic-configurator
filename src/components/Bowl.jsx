/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 Model_Bowl_2023_09_03.gltf -o Transformed_Model_Bowl_2023_09_03 
*/

import React from 'react'
import {  useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import clays from '../data/clays'
import mattGlazes from '../data/mattGlazes'
import shinyGlazes from '../data/shinyGlazes'

export function Bowl({ clay, glaze, glazePart }) {
  const { nodes, materials } = useGLTF('./models/Bowl.gltf')

  const findSelectedGlaze = () => {
    let glazeMaterial
    if (mattGlazes.find((item) => item.value === glaze)) {
      glazeMaterial = mattGlazes.find((item) => item.value === glaze)
      return glazeMaterial
    }
    if (shinyGlazes.find((item) => item.value === glaze)) {
      glazeMaterial = shinyGlazes.find((item) => item.value === glaze)
      return glazeMaterial
    }
  }

  const findSelectedClay = () => {
    const clayMaterial = clays.find((item) => item.value === clay)
    return clayMaterial
  }

  const renderBowl = () => {
    const clayMaterial = findSelectedClay()
    const glazeMaterial = findSelectedGlaze()
    let material

    if (clay === 'Basic Beige') {
      if(glazeMaterial === 'No glaze selected'){
        material = materials[clayMaterial?.basic]
      } else {
        material = materials[glazeMaterial?.basic]
      }
      clay = materials[clayMaterial?.basic]
    } else {
      if(glazeMaterial === 'No glaze selected'){
        material = materials[clayMaterial?.spreckled]
      } else {
        material = materials[glazeMaterial?.spreckled]
      }
      clay = materials[clayMaterial?.spreckled]
    }

    switch (glazePart) {
      case 'Completely glazed':
        return (
          <>
            <mesh
              geometry={nodes.BowlBase.geometry}
              material={clay ?? materials.Clay_Beige}
            />
            <mesh
              geometry={nodes.BowlInner.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlMiddle.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlBottom.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
          </>
        )

        break

      case 'Half glazed':
        return (
          <>
            <mesh
              geometry={nodes.BowlBase.geometry}
              material={clay ?? materials.Clay_Beige}
            />
            <mesh
              geometry={nodes.BowlInner.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlMiddle.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlBottom.geometry}
              material={clay ?? materials.Clay_Beige}
            />
          </>
        )
        break

      case 'Only glazed inside':
        return (
          <>
            <mesh
              geometry={nodes.BowlBase.geometry}
              material={clay ?? materials.Clay_Beige}
            />
            <mesh
              geometry={nodes.BowlInner.geometry}
              material={material ?? (clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlMiddle.geometry}
              material={clay ?? materials.Clay_Beige}
            />
            <mesh
              geometry={nodes.BowlBottom.geometry}
              material={clay ?? materials.Clay_Beige}
            />
          </>
        )

        break

      default:
        return (
          <>
            <mesh
              geometry={nodes.BowlBase.geometry}
              material={(clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlInner.geometry}
              material={(clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlMiddle.geometry}
              material={(clay ?? materials.Clay_Beige)}
            />
            <mesh
              geometry={nodes.BowlBottom.geometry}
              material={(clay ?? materials.Clay_Beige)}
            />
          </>
        )
        break
    }
  }

  return <group dispose={null}>{renderBowl()}</group>
}

useLoader.preload(GLTFLoader, './models/Bowl.gltf' /* extensions */)
