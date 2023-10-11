import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

import HeaderOption from './HeaderOption';

import { HeaderOptionData } from '@/models/HeaderOptionData';


export default function Header() {
    const operationsOptions: HeaderOptionData[] = [
        {
            url: '/operation/buy',
            image: '/sellerCommission.png',
            title: 'Realizar Compra',
            description: 'Compra de divisas a clientes y proveedores con caja en pesos o con caja deuda oficina.'
        }, {
            url: '/operation/sell',
            image: '/sellerCommission.png',
            title: 'Realizar Venta',
            description: 'Venta de divisas a clientes y asigancion de comisión a vendedores.'
        }, {
            url: '/operation/pending',
            image: '/sellerCommission.png',
            title: 'Operaciones Pendientes',
            description: 'Visualizar todas las operaciones de compra y venta en espera de ser ejecutadas o canceladas.'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Histórico de Operaciones',
            description: 'Visualizar todas las operaciones realizadas de compra y venta.'
        }
    ]
    const individualsOptions: HeaderOptionData[] = [
        {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Clientes',
            description: 'Crear, modificar y ver clientes'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Vendedores',
            description: 'Crear vendedores, modificar, visualizar lista de vendedoreas'
        }, {
            url: '/',
            image: '/sellerCommission.png',
            title: 'Proveedores',
            description: 'Crear proveedor, modificar y visualizar'
        }
    ]
    const boxesOptions: HeaderOptionData[] = [
        {
            url: '/multibox/list/PESO',
            image: '/sellerCommission.png',
            title: 'Caja en Pesos',
            description: 'Compra de divisas a clientes y proveedores con caja en pesos o con caja deuda oficina. '
        }, {
            url: '/multibox/foreign-currency',
            image: '/sellerCommission.png',
            title: 'Caja de Divisas',
            description: 'Visualizar las cajas de todas las divisas: dolar grande, dolar chico y cambio, euro y reales.'
        }, {
            url: '//multibox/list/PESOS_OFFICE',
            image: '/sellerCommission.png',
            title: 'Deuda Oficina',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        }, {
            url: '//multibox/list/PESO',//cambiar la URL cuando exista la iformacion
            image: '/sellerCommission.png',
            title: 'Ganancias',
            description: 'Ver caja de Balance, asignación de ganancías a Caja 1 o Caja 2 '
        }, {
            url: '//multibox/list/PESO',//cambiar la URL cuando exista la iformacion
            image: '/sellerCommission.png',
            title: 'Cajas',
            description: 'Ver caja de Balance, asignación de ganancías a Caja 1 o Caja 2 '
        }
    ]

    const othersOptions: HeaderOptionData[] = [
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
        }, 
        // {
        //     url: '/user',
        //     image: '/sellerCommission.png',
        //     title: 'Usuarios',
        //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, sit?'
        // }
    ]

    return (
        <nav className={styles.headerBase}>
            <Image src={'/SL-logo-transparent.png'} alt='Icono para indicar login' width={80} height={80} />
            <ul className={styles.headerLinks}>
                <li><p>Operaciones</p>
                    <ul>
                        {operationsOptions.map(operations => (
                            <li key={operations.title}>
                                <HeaderOption {...operations} />
                            </li>
                        ))}
                    </ul>
                </li>
                <li><p>Individuos </p>
                    <ul>
                        {individualsOptions.map(individual => (
                            <li key={individual.title}>
                                <HeaderOption {...individual} />
                            </li>
                        ))}
                    </ul>
                </li>
                <li><p>Todas las Cajas </p>
                    <ul>
                        {boxesOptions.map(box => (
                            <li key={box.title}>
                                <HeaderOption {...box} />
                            </li>
                        ))}
                    </ul>
                </li>
                <li><p>Otros</p>
                    <ul>
                        {othersOptions.map(other => (
                            <li key={other.title}>
                                <HeaderOption {...other} />
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
        </nav>
    )
}