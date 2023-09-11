import Image from 'next/image'
import styles from './page.module.css'

import LoginFormComponent from '@/components/loginForm/LoginFormComponent'

export default function Home() {
  return (
    <main >
    <LoginFormComponent/>
    </main>
  )
}
