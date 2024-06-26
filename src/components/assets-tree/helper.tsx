import { Circle, Lightning } from '@phosphor-icons/react'
import asset from '../../assets/asset.png'
import component from '../../assets/component.png'
import location from '../../assets/location.png'
import { AssetModel } from '../../types/asset.model'
import { Node } from '../../types/node'

export const CONTAINER_HEIGHT = 700
export const ITEM_HEIGHT = 26

export const isAsset = (node: Node | AssetModel): node is AssetModel => (
  Reflect.has(node, 'locationId') && !Reflect.has(node, 'sensorId')
)

export const isComponent = (node: Node | AssetModel): node is AssetModel => Reflect.has(node, 'sensorType') && !isAsset(node)

export const getIcon = (node: Node) => {
  if (isAsset(node)) return asset
  if (isComponent(node)) return component
  return location
}

export const getAlt = (node: Node) => {
  if (isAsset(node)) return 'asset'
  if (isComponent(node)) return 'component'
  return 'location'
}

export const getStatusIcon = (sensorType?: string | null) => {
  if (sensorType === 'energy') return <Lightning weight="fill" size={'0.75rem'} data-icon />
  if (!sensorType) return null
  return <Circle weight="fill" size={'0.5rem'} data-icon />
}
