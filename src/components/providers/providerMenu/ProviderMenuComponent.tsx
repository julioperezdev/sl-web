import styles from './ProviderMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function ProviderMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/providerMenu.png'} alt='Icono para el menu de proveedor' width={80} height={80} />
      <p>Proveedor</p>
      <div>
        <Image src={'/sellerNew.png'} alt='' width={30} height={30} />
        <Link href='/provider/add'>Nuevo proveedor</Link>
      </div>
      <div>
        <Image src={'/providerUpdate.png'} alt='' width={30} height={30} />
        <Link href='/provider/update'>Modificar proveedor</Link>
      </div>
      <div>
        <Image src={'/menu.png'} alt='' width={30} height={30} />
        <Link href='/provider/list'>Lista de proveedores</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}