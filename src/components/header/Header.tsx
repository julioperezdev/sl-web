import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

import HeaderOption from './HeaderOption';
import { url } from 'inspector';
import { HeaderOptionData } from '@/models/HeaderOptionData';


export default function Header() {
    const operationsOptions: HeaderOptionData[] = [
        {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Realizar Compra',
            description: 'Asignar o modificar las funciones que tendrá un usuario'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Realizar Venta',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Operaciones Pendientes',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }
    ]
    const individualsOptions: HeaderOptionData[] = [
        {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Multicaja',
            description: 'Asignar o modificar las funciones que tendrá un usuario'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Balance',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Deuda Oficina',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }
    ]
    const boxesOptions: HeaderOptionData[] = [
        {
            url: '/clients',
            image: '/sellerCommission.png',
            title: 'Clientes',
            description: 'Asignar o modificar las funciones que tendrá un usuario'
        }, {
            url: '/sellers',
            image: '/sellerCommission.png',
            title: 'Vendedores',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing'
        }, {
            url: '/provider',
            image: '/sellerCommission.png',
            title: 'Proveedores',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }, {
            url: '/note',
            image: '/sellerCommission.png',
            title: 'Recordatorios',
            description: 'Asignar o modificar las funciones que tendrá un usuario'
        }, {
            url: '/clear',
            image: '/sellerCommission.png',
            title: 'Borrar Datos',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing'
        }, {
            url: '/currency',
            image: '/sellerCommission.png',
            title: 'Cotización',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }, {
            url: '/user',
            image: '/sellerCommission.png',
            title: 'Usuarios',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }
    ]

    return (
        <nav className={styles.headerBase}>
            <Image src={'/circle.png'} alt='' width={50} height={50} />
            <ul className={styles.headerLinks}>
                <li><Link href='/'>Operaciones</Link>
                    <ul>
                        {operationsOptions.map(operations => (
                            <li key={operations.title}>
                                <HeaderOption {...operations} />
                            </li>
                        ))}
                    </ul>
                </li>
                <li><Link href='/'>Individuos </Link>
                    <ul>
                        {individualsOptions.map(individual => (
                            <li key={individual.title}>
                                <HeaderOption {...individual} />
                            </li>
                        ))}
                    </ul>
                </li>
                <li><Link href='/'>Todas las Cajas </Link>
                    <ul>
                        {boxesOptions.map(box => (
                            <li key={box.title}>
                                <HeaderOption {...box} />
                            </li>
                        ))}
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