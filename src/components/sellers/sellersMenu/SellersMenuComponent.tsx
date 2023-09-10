import styles from './SellersMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SellersMenuComponent() {
  return (
    <div className={styles.clientMenuBase}>
      <Image src={'/sellerMenu.png'} alt='Icono para el menu de vendedores' width={80} height={80} />
      <p>Vendedores</p>
      <div>
        <Image src={'/sellerNew.png'} alt='' width={30} height={30} />
        <Link href='/sellers/add'>Nuevo vendedor</Link>
      </div>
      <div>
        <Image src={'/sellerUpdate.png'} alt='' width={30} height={30} />
        <Link href='/sellers/update'>Modificar vendedor</Link>
      </div>
      <div>
        <Image src={'/sellerCommission.png'} alt='' width={30} height={30} />
        <Link href='/sellers/commission'>Comisiones</Link>
      </div>
      <div>
        <Image src={'/sellerCommissionPay.png'} alt='' width={30} height={30} />
        <Link href='/sellers/commission/history'>H. Comisiones pagadas</Link>
      </div>
      <Link href='/'>Atrás</Link>
    </div>
  )
}