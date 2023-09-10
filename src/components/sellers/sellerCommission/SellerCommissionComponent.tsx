import styles from './SellerCommissionComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SellerCommissionComponent() {
    return (
        <div className={styles.listDifferenceBase}>
            <Image src={'/sellerCommission.png'} alt='Icono para indicar la lista de comisiones del vendedor' width={100} height={100} />
            <p>Comisiones</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha O.</p>
                    <p>A. Vendedor</p>
                    <p>Pesos</p>
                    <p>Cantidad Vendida</p>
                    <p>Ganancia Vendedor</p>
                    <p>Estado</p>
                </div>
                <div className={styles.listDataChecked}>
                    <p>09/08/2023</p>
                    <p>Joseito</p>
                    <p>$1,00</p>
                    <p>$1.500</p>
                    <p>$1.500</p>
                    <p>Pendiente</p>
                </div>
                <div className={styles.listDataChecked}>
                    <p>07/08/2023</p>
                    <p>Luisito</p>
                    <p>$3,00</p>
                    <p>$2.000</p>
                    <p>$6.000</p>
                    <p>Pendiente</p>
                </div>
                <div className={styles.listDataChecked}>
                    <p>10/08/2023</p>
                    <p>Francesa</p>
                    <p>$2,50</p>
                    <p>$3.500</p>
                    <p>$8.750</p>
                    <p>Pendiente</p>
                </div>
            </div>
            <div className={styles.buttonBase}>
                <Link href='/sellers'>Atrás</Link>
                <button>Guardar</button>
            </div>
        </div>
    )
  }