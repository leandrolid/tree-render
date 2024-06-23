import { MagnifyingGlass } from '@phosphor-icons/react'
import { FC } from 'react'
import { useFilters } from '../../stores/filters.store'
import { AssetsTree } from '../assets-tree'
import styles from './styles.module.css'

export const LeftColumn: FC = () => {
  const { search, setSearch } = useFilters(({ search, setSearch }) => ({ search, setSearch }))

  return (
    <div className={styles.container}>
      <div
        className={styles.search}
      >
        <input
          type="text"
          name="search"
          autoComplete="off"
          className={styles.searchInput}
          value={search}
          placeholder="Buscar Ativo ou Local"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className={styles.searchButton}
        >
          <MagnifyingGlass weight="regular" />
        </button>
      </div>

      <AssetsTree />
    </div>
  )
}