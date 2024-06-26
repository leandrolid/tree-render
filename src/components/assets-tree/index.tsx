import { FC, useEffect, useMemo, useState } from 'react'
import { getAssetsService } from '../../services/get-assets.service'
import { useCompanies } from '../../stores/companies.store'

import { getLocationsService } from '../../services/get-locations.service'
import { useFilters } from '../../stores/filters.store'
import { Node } from '../../types/node'
import * as helper from './helper'
import styles from './styles.module.css'

const worker = new Worker(new URL('./webworker.ts', import.meta.url))

export const AssetsTree: FC = () => {
  const [tree, setTree] = useState<Node[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const company = useCompanies((state) => state.company)
  const { search, type, status, setAsset, asset } = useFilters()

  const filteredItems = useMemo(() => {
    const searchRegex = new RegExp(search, 'ig')
    return tree.filter((node) => {
      const match = searchRegex.test(node.name) || node.children.some((child) => searchRegex.test(child.name))
      const energy = node.sensorType === type || node.children.some((child) => child.sensorType === type)
      const critcal = node.status === status || node.children.some((child) => child.status === status)
      return match && (type ? energy : true) && (status ? critcal : true)
    })
  }, [search, status, tree, type])

  const startIndex = Math.floor(scrollTop / helper.ITEM_HEIGHT)
  const endIndex = Math.min(
    startIndex + Math.ceil(helper.CONTAINER_HEIGHT / helper.ITEM_HEIGHT),
    filteredItems.length
  )
  const visibleItems = filteredItems.slice(startIndex, endIndex)
  const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * helper.ITEM_HEIGHT

  useEffect(() => {
    const getNodes = async () => {
      try {
        setIsLoading(true)
        setTree([])

        const [assets, locations] = await Promise.all([
          getAssetsService({ companyId: company.id }),
          getLocationsService({ companyId: company.id }),
        ])

        worker.postMessage([...locations, ...assets])
        worker.onmessage = (event) => {
          setTree(event.data)
          setIsLoading(false)
          // setTree(allNodes)
        }
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getNodes()
  }, [company.id])

  const handleSetAsset = (node: Node) => {
    if (helper.isComponent(node)) {
      setAsset(node)
    }
  }

  return (
    <div
      className={styles.container}
      onScroll={(event) => {
        setScrollTop(Reflect.get(event.target, 'scrollTop'))
      }}
    >
      <div style={{ height: `${filteredItems.length * helper.ITEM_HEIGHT}px` }}>
        <ul
          className={styles.list}
          style={{
            position: 'relative',
            height: `${visibleItems.length * helper.ITEM_HEIGHT}px`,
            top: `${startIndex * helper.ITEM_HEIGHT}px`,
          }}
        >
          {
            isLoading
              ? (
                <li className={styles.item}>
                  <div className={styles.itemLabel}>Carregando...</div>
                </li>
              )
              : visibleItems
                .map((node) => (
                  <li
                    key={node.id}
                    className={styles.item}
                    title={node.name}
                    style={{
                      paddingLeft: `${node.level * 20}px`,
                    }}
                  >
                    <div
                      data-children={node.children.length > 0}
                      className={styles.itemLabel}
                      data-status={node.status}
                      data-active={asset.id === node.id}
                      role={helper.isComponent(node) ? 'button' : undefined}
                      tabIndex={helper.isComponent(node) ? 0 : undefined}
                      onClick={() => handleSetAsset(node)}
                    >
                      <img
                        id={`icon-${node.id}`}
                        src={helper.getIcon(node)}
                        alt={helper.getAlt(node)}
                        className={styles.itemIcon}
                      />
                      <span>{node.name}</span>
                      {helper.getStatusIcon(node.sensorType)}
                    </div>
                  </li>
                ))
          }
        </ul>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  )
}