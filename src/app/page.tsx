import Image from 'next/image'
import styles from './page.module.css'

import LoginFormComponent from '@/components/loginForm/LoginFormComponent'
import CurrencyHomeComponent from '@/components/home/currencyHome/CurrencyHomeComponent'

export default function Home() {
  return (
    <main >
    <LoginFormComponent/>
    <CurrencyHomeComponent/>
    </main>
  )
}
