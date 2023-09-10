import styles from './ListClientComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';


export default function ListClientComponent() {
    return(
        <div className={styles.listClientBase}>
            <Image src={'/menu.png'} alt='Icono para indicar la lista de clientes' width={100} height={100} />
            <p>Lista de Clientes</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha R.</p>
                    <p>A. Cliente</p>
                    <p>N. Teléfono</p>
                    <p>Dirección</p>
                    <p>Descripción</p>
                </div>
                <div className={styles.listData}>
                    <p>09/08/2023</p>
                    <p>Joseito</p>
                    <p>1140460004</p>
                    <p>Av San Juan 3347</p>
                    <p>Recomendado por Luis</p>
                </div>
                <div className={styles.listData}>
                    <p>07/08/2023</p>
                    <p>Luisito</p>
                    <p>1140460021</p>
                    <p>Av Uriarte 4054</p>
                    <p>Recomendado por Ana</p>
                </div>
                <div className={styles.listData}>
                    <p>10/08/2023</p>
                    <p>Francesa</p>
                    <p>1150627585</p>
                    <p>Flores 2574</p>
                    <p>Recomendado por Pechaco</p>
                </div>
            </div>
            <Link href='/clients'>Atrás</Link>
        </div>
    )
}