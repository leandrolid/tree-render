export type Node = {
  id: string
  parentId: string | null
  locationId?: string | null
  sensorType?: string | null
  status?: string | null
  name: string
  level: number
  children: Node[]
}