import type { GlazePropertyMap, ModelDimensionsMap } from '../types'

export const MODEL_DIMENSIONS: ModelDimensionsMap = {
  Cup: '9cm x 8cm (300ml)',
  Bowl: '14cm x 8cm (500ml)',
}

export const GLAZE_PROPERTY_FOODSAFE: GlazePropertyMap = {
  '9102 Transparent (B)': true,
  '9867 Patina (B)': true,
  '9863 Vergissmeinnicht (B)': true,
  '9864 Rosa Fels (B)': true,
  '1201 Pfefferminz (CJ)': true,
  '1253a Hellblau (CJ)': false,
}

export const GLAZE_PROPERTY_TENDSTORUN: GlazePropertyMap = {
  '9102 Transparent (B)': true,
  '9867 Patina (B)': false,
  '9863 Vergissmeinnicht (B)': false,
  '9864 Rosa Fels (B)': false,
  '1201 Pfefferminz (CJ)': true,
  '1253a Hellblau (CJ)': false,
}

export const GLAZE_PROPERTY_CRACKLING: GlazePropertyMap = {
  '9102 Transparent (B)': false,
  '9867 Patina (B)': false,
  '9863 Vergissmeinnicht (B)': false,
  '9864 Rosa Fels (B)': false,
  '1201 Pfefferminz (CJ)': false,
  '1253a Hellblau (CJ)': false,
}
