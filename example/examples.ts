import { useBasic } from './basic'
import { useLight } from './light'
import { useRoad } from './road'
import { useTexture } from './texture'
import { useTransform } from './transform'
import { useMovement } from './movement'
import { useControls } from './controls'
import { useGroup } from './group'
import { useMaterial } from './material'
import { useCamera } from './camera'
import { useGeomertry } from './geomertry'
import { useBackground } from './background'
import { useLoadModel } from './loadmodel'

export default {
  BASIC: useBasic,
  LIGHT: useLight,
  TEXTURE: useTexture,
  ROAD: useRoad,
  TRANSFORM: useTransform,
  MOVEMENT: useMovement,
  CONTROLS: useControls,
  GROUP: useGroup,
  MATERIAL: useMaterial,
  CAMERA: useCamera,
  GEOMERTRY: useGeomertry,
  BACKGROUND: useBackground,
  LOADMODEL: useLoadModel,
}
