import { FC } from 'react'

import { useCompanies } from '../../stores/companies.store'
import { LeftColumn } from '../left-column'
import { QuickFilters } from '../quick-filters'
import { RightColumn } from '../right-column'
import styles from './styles.module.css'

export const Dashboard: FC = () => {
  const company = useCompanies((state) => state.company)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <strong className={styles.titleLabel}>Ativos</strong><span className={styles.titleName}> / {company.name}</span>
        </h2>

        <QuickFilters />
      </div>
      <div className={styles.content}>
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  )
}