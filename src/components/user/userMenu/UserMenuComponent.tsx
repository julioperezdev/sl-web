import styles from './UserMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function UserMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/clientMenu.png'} alt='Icono para el menu de usuarios' width={80} height={80} />
      <p>Usuarios</p>
      <div>
        <Image src={'/add-user.png'} alt='' width={30} height={30} />
        <Link href='/user/add'>Registrar Usuario</Link>
      </div>
      <div>
        <Image src={'/clipboard.png'} alt='' width={30} height={30} />
        <Link href='/user/update'>Asignar/Modificar Usuario</Link>
      </div>
      <div>
        <Image src={'/difference-user.png'} alt='' width={30} height={30} />
        <Link href='/user/list'>Lista de Usuarios</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}