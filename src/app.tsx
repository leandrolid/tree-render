import styles from './app.module.css'
import { Dashboard } from './components/dashboard'
import { Header } from './components/header'

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Dashboard />
      </div>
    </div>
  )
}
