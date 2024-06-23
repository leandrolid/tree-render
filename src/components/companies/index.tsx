import { FC, useEffect } from 'react'
import { getCompaniesService } from '../../services/get-companies.service'
import { useCompanies } from '../../stores/companies.store'
import styles from './styles.module.css'

export const Companies: FC = () => {
  const { companies, setCompanies, setCompany, company } = useCompanies()

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await getCompaniesService()
        setCompanies(response)
      } catch (error) {
        console.error(error)
      }
    }
    getCompanies()
  }, [setCompanies])

  return (
    <ul className={styles.container}>
      {
        companies.map((companyRender) => (
          <li key={companyRender.id}>
            <button
              type="button"
              className={styles.company}
              data-active={companyRender.id === company.id}
              onClick={() => setCompany(companyRender)}
            >
              {companyRender.name} Unit
            </button>
          </li>
        ))
      }
    </ul>
  )
}