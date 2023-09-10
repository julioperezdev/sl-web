import styles from './ClientsMenu.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function ClientsMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/clientMenu.png'} alt='Icono para el menu de clientes' width={80} height={80} />
      <p>Clientes</p>
      <div>
        <Image src={'/add-user.png'} alt='' width={30} height={30} />
        <Link href='/clients/add'>Nuevo cliente</Link>
      </div>
      <div>
        <Image src={'/edit-user.png'} alt='' width={30} height={30} />
        <Link href='/clients/update'>Modificar cliente</Link>
      </div>
      <div>
        <Image src={'/menu.png'} alt='' width={30} height={30} />
        <Link href='/clients/list'>Lista de clientes</Link>
      </div>
      <div>
        <Image src={'/difference-user.png'} alt='' width={30} height={30} />
        <Link href='/clients/difference'>Diferencia de clientes</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}