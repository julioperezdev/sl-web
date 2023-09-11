import styles from './ListUserComponent.module.css'
import Image from 'next/image';
import Link from 'next/link';


export default function ListUserComponent() {
    return(
        <div className={styles.listClientBase}>
            <Image src={'/difference-user.png'} alt='Icono para indicar la lista de proveedores' width={100} height={100} />
            <p>Lista de Usuarios</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Nombre de Usuario</p>
                    <p>Contraseña</p>
                    <p>Funciones</p>
                </div>
                <div className={styles.listData}>
                    <p>Usuario 1</p>
                    <p>1user2023</p>
                    <p>Operaciones, Individuos, Todas las cajas</p>
                </div>
                <div className={styles.listData}>
                    <p>Usuario 2</p>
                    <p>2user2023</p>
                    <p>Vendedores, Balance, Deuda Oficina</p>
                </div>
                <div className={styles.listData}>
                    <p>Usuario 3</p>
                    <p>3user2023</p>
                    <p>Todas las cajas</p>
                </div>
            </div>
            <Link href='/user'>Atrás</Link>
        </div>
    )
}