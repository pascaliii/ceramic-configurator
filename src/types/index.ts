// ─── Model ───────────────────────────────────────────────────────────────────

export type ModelName = 'Cup' | 'Bowl'

// ─── Glaze ───────────────────────────────────────────────────────────────────

export type GlazePart =
  | 'Completely glazed'
  | 'Half glazed'
  | 'Only glazed inside'
  | 'No glaze selected'

export interface GlazeItem {
  _id: string
  name: string
  value: string
  basic: string
  spreckled: string
  src: string
  alt: string
}

// ─── Clay ────────────────────────────────────────────────────────────────────

export interface ClayItem {
  _id: string
  name: string
  value: string
  basic: string
  spreckled: string
  src: string
  alt: string
  baseColor: string
  height: string
  normal: string
  ao: string
  roughness: string
}

// ─── Parts ───────────────────────────────────────────────────────────────────

export interface PartItem {
  _id: string
  name: string
  value: GlazePart
  src: string
  alt: string
}

// ─── Data maps ───────────────────────────────────────────────────────────────

export type GlazePropertyMap = Record<string, boolean>
export type ModelDimensionsMap = Record<ModelName, string>
