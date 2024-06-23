import { FC, useEffect, useState } from 'react'
import { getAssetsService } from '../../services/get-assets.service'
import { useCompanies } from '../../stores/companies.store'

import { getLocationsService } from '../../services/get-locations.service'
import { useFilters } from '../../stores/filters.store'
import { Node } from '../../types/node'
import { Tree } from '../../types/tree'
import * as helper from './helper'
import styles from './styles.module.css'

export const AssetsTree: FC = () => {
  const [tree, setTree] = useState<Node[]>([])
  const company = useCompanies((state) => state.company)
  const { search, type, status, setAsset, asset } = useFilters()

  useEffect(() => {
    const getNodes = async () => {
      try {
        const [assets, locations] = await Promise.all([
          getAssetsService({ companyId: company.id }),
          getLocationsService({ companyId: company.id }),
        ])

        const allNodes = [...locations, ...assets]
        setTree(allNodes)
      } catch (error) {
        console.error(error)
      }
    }
    getNodes()
  }, [company.id])

  const handleSetAsset = (node: Node) => {
    if (helper.isComponent(node)) {
      setAsset(node)
    }
  }

  const renderTree = (parentId: string | null): Tree => {
    return tree
      .filter((node) => helper.validateNode(node, parentId))
      .map((node) => {
        const children = renderTree(node.id)
        const searchRegex = new RegExp(search, 'ig')
        const match = searchRegex.test(node.name) || children.some((node) => node.match)
        const eletric = node.sensorType === type || children.some((node) => node.eletric)
        const critcal = node.status === status || children.some((node) => node.critcal)
        return {
          match,
          eletric,
          critcal,
          children: (
            <li
              key={node.id}
              className={styles.item}
              data-children={children.length > 0}
              data-match={match}
              data-energy={type ? eletric : 'na'}
              data-alert={status ? critcal : 'na'}
              title={node.name}
            >
              <div
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
              {
                children.length > 0 && (
                  <ul className={styles.list}>
                    {children.map((node) => node.children)}
                  </ul>
                )
              }
            </li>
          )
        }
      })
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {renderTree(null).map((node) => node.children)}
      </ul>
    </div>
  )
}