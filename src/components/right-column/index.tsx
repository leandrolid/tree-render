import { FC } from 'react'

import styles from './styles.module.css'

import { BoxArrowUp } from '@phosphor-icons/react'
import { useFilters } from '../../stores/filters.store'
import * as helper from '../assets-tree/helper'

export const RightColumn: FC = () => {
  const asset = useFilters((state) => state.asset)

  return (
    <div className={styles.container}>
      <header
        className={styles.header}
        data-status={asset.status}
      >
        <h3>{asset.name}</h3>
        {helper.getStatusIcon(asset.sensorType)}
      </header>
      <main className={styles.content}>
        <section className={styles.basics}>
          <div className={styles.basicImage}>
            <BoxArrowUp weight="regular" />
            <span>Adicionar imagem do ativo</span>
          </div>
          <div className={styles.basicsAside}>
            <div className={styles.info}>
              <strong>Tipo de equipamento</strong>
              <span>{'Motor Elétrico (Trifásico)'}</span>
            </div>
            <div className={styles.info} data-border-top="true">
              <strong>Responsáveis</strong>
              <span>{'Elétrica'}</span>
            </div>
          </div>
        </section>

        <section className={styles.sensors}>
          <div className={styles.info}>
            <strong>Sensor</strong>
            <span>{asset.sensorId}</span>
          </div>
          <div className={styles.info}>
            <strong>Receptor</strong>
            <span>{asset.gatewayId}</span>
          </div>
        </section>
      </main>
    </div>
  )
}