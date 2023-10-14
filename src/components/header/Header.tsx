'use client'
import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import HeaderOption from './HeaderOption';

import { HeaderOptionData } from '@/models/HeaderOptionData';


export default function Header() {
    const router = useRouter();
    function redirectToHome(){
        router.replace('/')
    }
    const operationsOptions: HeaderOptionData[] = [
        {
            url: '/operation/buy',
            image: '/images/image_17.png',
            title: 'Realizar Compra',
            description: 'Compra de divisas a clientes y proveedores con caja en pesos o con caja deuda oficina.'
        }, {
            url: '/operation/sell',
            image: '/images/image_16.png',
            title: 'Realizar Venta',
            description: 'Venta de divisas a clientes y asigancion de comisión a vendedores.'
        }, {
            url: '/operation/pending',
            image: '/images/image_14.png',
            title: 'Operaciones Pendientes',
            description: 'Visualizar todas las operaciones de compra y venta en espera de ser ejecutadas o canceladas.'
        }, {
            url: '/',
            image: '/images/image_13.png',
            title: 'Histórico de Operaciones',
            description: 'Visualizar todas las operaciones realizadas de compra y venta.'
        }, {
            url: '/operation',
            image: '/images/image_11.png',
            title: 'Menu de Operaciones',
            description: 'Visualizar todas las opciones del menu'
        }
        //image_11
    ]
    const individualsOptions: HeaderOptionData[] = [
        {
            url: '/clients',
            image: '/images/image_29.png',
            title: 'Clientes',
            description: 'Crear, modificar y ver clientes'
        }, {
            url: '/sellers',
            image: '/images/image_301.png',
            title: 'Vendedores',
            description: 'Crear vendedores, modificar, visualizar lista de vendedoreas'
        }, {
            url: '/provider',
            image: '/images/image_33.png',
            title: 'Proveedores',
            description: 'Crear proveedor, modificar y visualizar'
        }
    ]
    const boxesOptions: HeaderOptionData[] = [
        {
            url: '/multibox/list/PESO',
            image: '/images/image_40.png',
            title: 'Caja en Pesos',
            description: 'Visualizar los movimientos de la caja en pesos, realizar ingresos y egresos.'
        }, {
            url: '/multibox/foreign-currency',
            image: '/images/image_40.png',
            title: 'Caja de Divisas',
            description: 'Visualizar las cajas de todas las divisas: dolar grande, dolar chico y cambio, euro y reales, realizar ingresos y egresos.'
        }, {
            url: '/multibox/list/PESO_OFFICE',
            image: '/images/image_40.png',
            title: 'Deuda Oficina',
            description: 'Ver detalle del saldo acumulado y pagar el total de la deuda.'
        }, {
            url: '/multibox/list/PESO',//cambiar la URL cuando exista la iformacion
            image: '/images/image_40.png',
            title: 'Ganancias',
            description: 'Ver caja de Balance, asignación de ganancías a Caja 1 o Caja 2'
        }, {
            url: '/multibox/list/PESO',//cambiar la URL cuando exista la iformacion
            image: '/images/image_40.png',
            title: 'Cajas 1',
            description: 'Visualizar movimientos de la caja 1, realizar ingresos y egresos'
        }, {
            url: '/multibox/list/PESO',//cambiar la URL cuando exista la iformacion
            image: '/images/image_40.png',
            title: 'Cajas 2',
            description: 'Visualizar movimientos de la caja 2, realizar ingresos y egresos'
        }, {
            url: '/multibox',
            image: '/images/image_40.png',
            title: 'Menu de Cajas',
            description: 'Visualizar el menu de todas las opciones'
        }
    ]

    const othersOptions: HeaderOptionData[] = [
        {
            url: '/currency/update',
            image: '/images/Actualizar_Cotizacion.png',
            title: 'Actualizar Cotización',
            description: 'Asignar precio de compra y venta a las divisas.'
        }, {
            url: '/note/add',
            image: '/images/Nuevo_Recordatorio.png',
            title: 'Recordatorios',
            description: 'Crear nuevos recordatorios, visualizar, modificar y eliminar'
        }, {
            url: '/clear',
            image: '/trash.png',
            title: 'Borrar Datos',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing'
        } 
    ]

    return (
        <nav className={styles.headerBase}>
            <Image src={'/images/Icono_de_SL.png'} alt='Icono para indicar login' width={45} height={45} onClick={()=> redirectToHome()}/>
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
            <div className={styles.userNameBase}>
                <Image src={'/images/Icono_de_la_barra.png'} alt='' width={30} height={30} />
                <p className={styles.userName}>Usuario 1</p>
            </div>
            <Link href=''>Cerrar Sesión</Link>
        </nav>
    )
}