import styles from './DifferenceMenuComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function DifferenceMenuComponent() {
    return (
        <div className={styles.differenceMenuBase}>
            <Image src={'/difference-user.png'} alt='Icono para el menu de diferencia de clientes' width={80} height={80} />
            <p>Diferencia de Clientes</p>
            <div>
                <Image src={'/add-list.png'} alt='' width={30} height={30} />
                <Link href='/clients/difference/add'>Nueva diferencia</Link>
            </div>
            <div>
                <Image src={'/menu.png'} alt='' width={30} height={30} />
                <Link href='/clients/difference/list'>Histórico de Diferencias</Link>
            </div>
            <Link href='/clients'>Atrás</Link>
        </div>
    )
}