import { Info, Lightning } from '@phosphor-icons/react'
import { FC } from 'react'
import { useFilters } from '../../stores/filters.store'
import styles from './styles.module.css'

export const QuickFilters: FC = () => {
  const { toggleStatusAlert, toggleTypeEnergy, status, type } = useFilters()

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        data-active={type === 'energy'}
        onClick={toggleTypeEnergy}
      >
        <Lightning weight="bold" />
        {'Sensor de Energia'}
      </button>
      <button
        type="button"
        className={styles.button}
        data-active={status === 'alert'}
        onClick={toggleStatusAlert}
      >
        <Info weight="bold" />
        {'Crítico'}
      </button>
    </div>
  )
}