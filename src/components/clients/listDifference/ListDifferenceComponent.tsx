import styles from './ListDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function ListDifferenceComponent() {
    return (
        <div className={styles.listDifferenceBase}>
            <Image src={'/menu.png'} alt='Icono para indicar la lista de clientes' width={100} height={100} />
            <p>Histórico de Diferencias</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha R.</p>
                    <p>A. Cliente</p>
                    <p>F / S</p>
                    <p>Importe</p>
                    <p>Detalle inconveniente</p>
                    <p>Estado</p>
                </div>
                <div className={styles.listDataChecked}>
                    <p>09/08/2023</p>
                    <p>Joseito</p>
                    <p>Faltante</p>
                    <p>$500</p>
                    <p>Me dio de menos en un fajo de $10.000</p>
                    <p>Pendiente</p>
                </div>
                <div className={styles.listData}>
                    <p>07/08/2023</p>
                    <p>Luisito</p>
                    <p>Sobrante</p>
                    <p>$5.000</p>
                    <p>Había de mas en un fajo de $50.000</p>
                    <p>Resuelto</p>
                </div>
                <div className={styles.listData}>
                    <p>10/08/2023</p>
                    <p>Francesa</p>
                    <p>Faltante</p>
                    <p>$10.000</p>
                    <p>Fajo de $100.000 incompleto</p>
                    <p>Resuelto</p>
                </div>
            </div>
            <div className={styles.buttonBase}>
                <Link href='/clients/difference'>Atrás</Link>
                <Link href='/clients/difference/update'>Modificar</Link>
                <button>Guardar</button>
            </div>
        </div>
    )
}