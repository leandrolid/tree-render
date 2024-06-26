import { AssetModel } from '../../types/asset.model'
import { LocationModel } from '../../types/location.model'

const validateNode = (node: AssetModel | LocationModel, parentId: string | null) => {
  if (Reflect.get(node, 'locationId') && Reflect.get(node, 'locationId') === parentId) return true
  if (Reflect.get(node, 'locationId')) return false
  if (node.parentId === parentId) return true
  return false
}

const orderElements = (tree: Array<AssetModel | LocationModel>, parentId: string | null, level: number): Node[] => {
  return tree
    .filter((node) => validateNode(node, parentId))
    .flatMap((node) => {
      const children = orderElements(tree, node.id, level + 1)
      return [
        {
          ...node,
          level,
          children,
        } as unknown as Node,
        ...children
      ]
    })
}

onmessage = (e) => {
  const result = orderElements(e.data, null, 0)
  postMessage(result)
}