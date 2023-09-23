import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    return (
        <nav className={styles.headerBase}>
            <Image src={'/circle.png'} alt='' width={50} height={50} />
            <ul className={styles.headerLinks}>
                <li><Link href='/'>Operaciones</Link>
                    <ul>
                        <li><Link href='/'>Realizar Compra</Link></li>
                        <li><Link href='/'>Realizar Venta</Link></li>
                        <li><Link href='/'>Operaciones Pendientes</Link></li>
                    </ul>
                </li>
                <li><Link href='/'>Individuos </Link>
                    <ul>
                        <li><Link href='/'>Multicaja</Link></li>
                        <li><Link href='/'>Balance</Link></li>
                        <li><Link href='/'>Deuda Oficina</Link></li>
                    </ul>
                </li>
                <li><Link href='/'>Todas las Cajas </Link>
                    <ul>
                        <li><Link href='/clients'>Clientes</Link></li>
                        <li><Link href='/sellers'>Vendedores</Link></li>
                        <li><Link href='/provider'>Proveedores</Link></li>
                        <li><Link href='/note'>Recordatorios</Link></li>
                        <li><Link href='/clear'>Borrar Datos</Link></li>
                        <li><Link href='/currency'>Cotización</Link></li>
                        <li><Link href='/user'>Usuarios</Link></li>
                    </ul>
                </li>
            </ul>
            <div>
                <Image src={'/user.png'} alt='' width={50} height={50} />
                <p>Usuario 1</p>
            </div>
            <Link href=''>Cerrar Sesión</Link>



{/* 
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
                        <li><Link href='/currency'>Cotización</Link></li>
                        <li><Link href='/user'>Usuarios</Link></li>
                    </ol>
                </details>
            </div>
            <div>
                <Image src={'/user.png'} alt='' width={50} height={50} />
                <p>Usuario 1</p>
            </div>
            <Link href=''>Cerrar Sesión</Link> */}
        </nav>
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