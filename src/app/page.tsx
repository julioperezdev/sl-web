import Image from 'next/image'
import styles from './page.module.css'

import LoginFormComponent from '@/components/loginForm/LoginFormComponent'
import CurrencyHomeComponent from '@/components/home/currencyHome/CurrencyHomeComponent'
import NoteHomeComponent from '@/components/home/noteHome/NoteHomeComponent'

export default function Home() {
  return (
    <main className={styles.homeBase}>

    <CurrencyHomeComponent/>
    <NoteHomeComponent/>
    </main>
  )
}
