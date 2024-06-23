import { FC } from 'react'

import { Companies } from '../companies'
import styles from './styles.module.css'

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>TRACTIAN</h1>

      <Companies />
    </header>
  )
}