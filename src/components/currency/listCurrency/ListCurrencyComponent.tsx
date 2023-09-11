import styles from './ListCurrencyComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';


export default function ListCurrencyComponent() {
    return(
        <div className={styles.listClientBase}>
            <Image src={'/menu.png'} alt='Icono para indicar la lista de cotizacion' width={100} height={100} />
            <p>Historico de Actualizaciones</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha</p>
                    <p>Hora</p>
                    <p>Tipo de Divisa</p>
                    <p>Precio de Compra</p>
                    <p>Precio Venta</p>
                </div>
                <div className={styles.listData}>
                    <p>09/08/2023</p>
                    <p>18:14:30</p>
                    <p>Dolar Grande</p>
                    <p>$780</p>
                    <p>$900</p>
                </div>
                <div className={styles.listData}>
                    <p>07/08/2023</p>
                    <p>18:14:30</p>
                    <p>Dolar Chico y Cambio</p>
                    <p>$800</p>
                    <p>$850</p>
                </div>
                <div className={styles.listData}>
                    <p>10/08/2023</p>
                    <p>18:14:30</p>
                    <p>Euros</p>
                    <p>$950</p>
                    <p>$970</p>
                </div>
            </div>
            <Link href='/currency'>Atrás</Link>
        </div>
    )
}