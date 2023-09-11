import styles from './NoteMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function NoteMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/notes.png'} alt='Icono para el menu de recordatorios' width={80} height={80} />
      <p>Recordatorios</p>
      <div>
        <Image src={'/add-post.png'} alt='' width={30} height={30} />
        <Link href='/note/add'>Nuevo Recordatorio</Link>
      </div>
      <div>
        <Image src={'/clipboard.png'} alt='' width={30} height={30} />
        <Link href='/note/add'>Modificar/Eliminar Recordatorio</Link>
      </div>
      <div>
        <Image src={'/menu.png'} alt='' width={30} height={30} />
        <Link href='/note/add'>Historial de Recordatorios</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}