import type { Material } from 'three'
import clays from '../data/clays'
import mattGlazes from '../data/mattGlazes'
import shinyGlazes from '../data/shinyGlazes'
import type { GlazePart } from '../types'

interface UseModelMaterialsProps {
  clay: string
  glaze: string
  glazePart: GlazePart
  materials: Record<string, Material>
}

/**
 * Resolves which Three.js Material to use for glazed vs. unglazed mesh parts,
 * based on the selected clay, glaze and glazing area.
 */
export function useModelMaterials({
  clay,
  glaze,
  glazePart,
  materials,
}: UseModelMaterialsProps) {
  const allGlazes = [...shinyGlazes, ...mattGlazes]

  const clayItem = clays.find((item) => item.value === clay)
  const glazeItem = allGlazes.find((item) => item.value === glaze)

  const isBasicBeige = clay === 'Basic Beige'
  const isNoGlaze = !glazeItem || glaze === 'No glaze selected'

  // Resolve clay material key (basic vs. spreckled variant)
  const clayKey = isBasicBeige ? clayItem?.basic : clayItem?.spreckled
  const clayMaterial: Material = materials[clayKey ?? 'Clay_Beige'] ?? materials['Clay_Beige']

  // Resolve glaze material key; fall back to clay when no glaze selected
  const glazeKey = isBasicBeige ? glazeItem?.basic : glazeItem?.spreckled
  const glazeMaterial: Material = isNoGlaze
    ? clayMaterial
    : (materials[glazeKey ?? ''] ?? clayMaterial)

  /**
   * Returns the correct material for a given mesh part.
   * @param isGlazedInThisVariant - whether this part receives glaze in the current glazePart mode
   */
  const getMaterial = (isGlazedInThisVariant: boolean): Material => {
    return isGlazedInThisVariant ? glazeMaterial : clayMaterial
  }

  return { clayMaterial, glazeMaterial, getMaterial, glazePart }
}
