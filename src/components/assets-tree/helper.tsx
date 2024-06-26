import { Circle, Lightning } from '@phosphor-icons/react'
import asset from '../../assets/asset.png'
import component from '../../assets/component.png'
import location from '../../assets/location.png'
import { AssetModel } from '../../types/asset.model'
import { LocationModel } from '../../types/location.model'
import { Node } from '../../types/node'

export const isAsset = (node: Node | AssetModel): node is AssetModel => (
  Reflect.has(node, 'locationId') && !Reflect.has(node, 'sensorId')
)

export const isComponent = (node: Node | AssetModel): node is AssetModel => Reflect.has(node, 'sensorType') && !isAsset(node)

export const validateNode = (node: AssetModel | LocationModel, parentId: string | null) => {
  if (Reflect.get(node, 'locationId') && Reflect.get(node, 'locationId') === parentId) return true
  if (Reflect.get(node, 'locationId')) return false
  if (node.parentId === parentId) return true
  return false
}

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

export const orderElements = (tree: Array<AssetModel | LocationModel>, parentId: string | null, level: number): Node[] => {
  return tree
    .filter((node) => validateNode(node, parentId))
    .flatMap((node) => {
      const children = orderElements(tree, node.id, level + 1)
      return [
        {
          ...node,
          level,
          children,
        },
        ...children
      ]
    })
}