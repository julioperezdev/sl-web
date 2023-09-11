import styles from './CurrencyMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function CurrencyMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/currency.png'} alt='Icono para el menu de Cotizacion' width={80} height={80} />
      <p>Cotización</p>
      <div>
        <Image src={'/notes.png'} alt='' width={30} height={30} />
        <Link href='/currency/update'>Actualizar Cotización</Link>
      </div>
      <div>
        <Image src={'/menu.png'} alt='' width={30} height={30} />
        <Link href='/currency/list'>Historico de Actualizaciones</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}