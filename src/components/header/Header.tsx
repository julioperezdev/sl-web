import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    return (
        <div className={styles.headerBase}>
            <Image src={'/circle.png'} alt='' width={50} height={50}/>
            <div className={styles.headerLinks}>
                <details>
                    <summary>Operaciones</summary>
                    <ol>
                        <li>Realizar Compra</li>
                        <li>Realizar Venta</li>
                        <li>Operaciones Pendientes</li>
                    </ol>
                </details>
                <details>
                    <summary>Individuos</summary>
                    <ol>
                        <li>Multicaja</li>
                        <li>Balance</li>
                        <li>Deuda Oficina</li>
                    </ol>
                </details>
                <details>
                    <summary>Todas las Cajas</summary>
                    <ol>
                        <li><Link href='/clients'>Clientes</Link></li>
                        <li><Link href='/sellers'>Vendedores</Link></li>
                        <li><Link href='/provider'>Proveedores</Link></li>
                        <li><Link href='/note'>Recordatorios</Link></li>
                        <li><Link href='/clear'>Borrar Datos</Link></li>
                    </ol>
                </details>
            </div>
            <div>
            <Image src={'/user.png'} alt='' width={50} height={50}/>
            <p>Usuario 1</p>
            </div>
            <Link href=''>Cerrar Sesión</Link>
        </div>
        // <nav className={styles.HeaderBase}>
        //     <ul>
        //         <p>Operaciones</p>
        //         <ul>
        //             <li>
        //             <Link href={''}>Realizar Compra</Link>
        //             </li>
        //             <li>
        //             <Link href={''}>Realizar Venta</Link>
        //             </li>
        //             <li>
        //             <Link href={''}>Operaciones Pendientes</Link>
        //             </li>
        //         </ul>
        //     </ul>
        // </nav>
    )
}