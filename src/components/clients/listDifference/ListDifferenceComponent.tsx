'use client'
import { DifferenceClient } from '@/models/DifferenceClient';
import styles from './ListDifferenceComponent.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

export default function ListDifferenceComponent() {
    const [selected, setSelected] = useState<string | null>(null)
    const [differences, setDifferences] = useState<DifferenceClient[]>([])

    async function getDifferenceClients() {
        const response = await fetch('http://localhost:8081/api/v1/client/difference/get', {
            method: 'POST',
        });
        let differenceData: DifferenceClient[] = await response.json();
        setDifferences(differenceData)
    }
    useEffect(() => {
        getDifferenceClients();
    }, [])

    function isSelected(id:string):boolean{
        return id == selected;
    }
    return (
        <div className={styles.listDifferenceBase}>
            <Image src={'/menu.png'} alt='Icono para indicar la lista de clientes' width={100} height={100} />
            <p>Histórico de Diferencias</p>
            <div className={styles.listDataBase}>
                <div className={styles.listTitles}>
                    <p>Fecha Registro</p>
                    <p>Apodo Cliente</p>
                    <p>Faltante / Sobrante</p>
                    <p>Importe</p>
                    <p>Detalle Inconveniente</p>
                    <p>Estado</p>
                    <p>ID</p>
                </div>
                <div className={styles.dataContainer}>
                {
                    differences.map(difference => (
                        <div className={isSelected(difference.id) ? styles.listDataSelected : styles.listData} key={difference.id} onClick={()=> setSelected(difference.id)}>
                            <p>{format(parseISO(difference.createdAt), 'd/MM/yyyy')}</p>
                            <p>{difference.clientId}</p>
                            <p>{difference.differenceType}</p>
                            <p>${difference.amount}</p>
                            <p>{difference.description}</p>
                            <p>{difference.differenceStatus}</p>
                            <p>{difference.id}</p>
                        </div>
                    ))
                }
                </div>
                {/* <div className={styles.listDataChecked}>
                    <p>09/08/2023</p>
                    <p>Joseito</p>
                    <p>Faltante</p>
                    <p>$500</p>
                    <p>Me dio de menos en un fajo de $10.000</p>
                    <p>Pendiente</p>
                    <p></p>
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
                </div> */}
            </div>
            <div className={styles.buttonBase}>
                <Link href='/clients/difference'>Atrás</Link>
                <Link href={`/clients/difference/update/${selected}`}>Modificar</Link>
                <button>Guardar</button>
            </div>
        </div>
    )
}